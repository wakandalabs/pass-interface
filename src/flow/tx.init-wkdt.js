import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import WakandaToken from 0xWakandaToken

transaction {
  prepare(signer: AuthAccount) {
    if !WakandaToken.check(signer.address) {
      if(signer.borrow<&WakandaToken.Vault>(from: WakandaToken.TokenStoragePath) == nil) {
        signer.save(<-WakandaToken.createEmptyVault(), to: WakandaToken.TokenStoragePath)
        signer.link<&WakandaToken.Vault{FungibleToken.Receiver}>(
          WakandaToken.TokenPublicReceiverPath,
          target: WakandaToken.TokenStoragePath
        )
        signer.link<&WakandaToken.Vault{FungibleToken.Balance}>(
          WakandaToken.TokenPublicBalancePath,
          target: WakandaToken.TokenStoragePath
        )
      }
    }
  }
}
`

export async function txInitWkdt(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(70),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
