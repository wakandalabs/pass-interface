import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "../util/tx";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import WakandaToken from 0xWakandaToken
import WakandaPass from 0xWakandaPass

transaction {
  prepare(signer: AuthAccount) {
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

    if signer.borrow<&WakandaPass.Collection>(from: WakandaPass.CollectionStoragePath) == nil {
      let collection <- WakandaPass.createEmptyCollection() as! @WakandaPass.Collection
      signer.save(<-collection, to: WakandaPass.CollectionStoragePath)
      signer.link<&{NonFungibleToken.CollectionPublic, WakandaPass.CollectionPublic}>(
        WakandaPass.CollectionPublicPath,
        target: WakandaPass.CollectionStoragePath)
    }
  }
}
`

export async function initializeAccount(address, opts = {}) {
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
