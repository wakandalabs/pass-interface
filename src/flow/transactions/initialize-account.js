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
    if !WakandaToken.check(signer.address) {
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

    if !WakandaPass.check(signer.address) {
      let collection <- WakandaPass.createEmptyCollection() as! @WakandaPass.Collection
      signer.save(<-collection, to: WakandaPass.CollectionStoragePath)
      signer.link<&{NonFungibleToken.CollectionPublic, WakandaPass.CollectionPublic}>(
        WakandaPass.CollectionPublicPath,
        target: WakandaPass.CollectionStoragePath)
    }
    
    if !WakandaProfile.check(signer.address) {
      signer.save(<- WakandaProfile.new(), to: WakandaProfile.ProfileStoragePath)
      signer.link<&WakandaProfile.WakandaProfileBase{WakandaProfile.WakandaProfilePublic}>(WakandaProfile.ProfilePublicPath, target: WakandaProfile.ProfileStoragePath)
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
