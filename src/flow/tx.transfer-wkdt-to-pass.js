import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import WakandaToken from 0xWakandaToken
import WakandaPass from 0xWakandaPass

transaction(amount: UFix64, id: UInt64) {
    let sentVault: @FungibleToken.Vault
    let wakandaPassRef: &WakandaPass.NFT
    
    prepare(signer: AuthAccount) {
        let vaultRef = signer.borrow<&WakandaToken.Vault>(from: WakandaToken.TokenStoragePath)
    ?? panic("Could not borrow reference to the owner's Vault!")
        self.sentVault <- vaultRef.withdraw(amount: amount)
        let wakandaPassCollectionRef = signer.borrow<&WakandaPass.Collection>(from: WakandaPass.CollectionStoragePath)
    ?? panic("Could not borrow reference to the owner's WakandaPass collection!")
    
        self.wakandaPassRef = wakandaPassCollectionRef.borrowWakandaPassPrivate(id: id)
    }

    execute {
        self.wakandaPassRef.vault.deposit(from: <- self.sentVault)
    }
}
`

// prettier-ignore
export function txTransferWkdtToPass({amount, id}, opts = {}) {
  invariant(amount != null, "txTransferWkdtToPass({amount, id}) -- amount required")
  invariant(id != null, "txTransferWkdtToPass({amount, id}) -- id required")

  return tx([
    transaction(CODE),
    args([
      arg(amount, t.UFix64),
      arg(id, t.UInt64),
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}