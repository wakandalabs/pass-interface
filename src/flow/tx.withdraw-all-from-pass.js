import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import WakandaToken from 0xWakandaToken
import WakandaPass from 0xWakandaPass

transaction(id: UInt64) {
    let vaultRef: &WakandaToken.Vault
    let wakandaPassRef: &WakandaPass.NFT

    prepare(signer: AuthAccount) {
        self.vaultRef = signer.borrow<&WakandaToken.Vault>(from: WakandaToken.TokenStoragePath)
    ?? panic("Could not borrow reference to the owner's Vault!")

        let wakandaPassCollectionRef = signer.borrow<&WakandaPass.Collection>(from: WakandaPass.CollectionStoragePath)
    ?? panic("Could not borrow reference to the owner's WakandaPass collection!")

        self.wakandaPassRef = wakandaPassCollectionRef.borrowWakandaPassPrivate(id: id)
    }

    execute {
        let vault <- self.wakandaPassRef.withdrawAllUnlockedTokens()

        self.vaultRef.deposit(from: <- vault)
    }
}
`

// prettier-ignore
export function txWithdrawAllFromPass({id}, opts = {}) {
  invariant(id != null, "txWithdrawAllFromPass({address, id}) -- id required")

  return tx([
    transaction(CODE),
    args([
      arg(id, t.UInt64)
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}