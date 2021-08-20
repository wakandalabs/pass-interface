import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import WakandaToken from 0xWakandaToken

transaction(amount: UFix64, to: Address) {
    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
        let vaultRef = signer.borrow<&WakandaToken.Vault>(from: WakandaToken.TokenStoragePath) ?? panic("Could not borrow reference to the owner's Vault!")
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
        let recipient = getAccount(to)
        let receiverRef = recipient.getCapability(WakandaToken.TokenPublicReceiverPath)
            .borrow<&{FungibleToken.Receiver}>() ?? panic("Could not borrow receiver reference to the recipient's Vault")
        receiverRef.deposit(from: <-self.sentVault)
    }
}
`

// prettier-ignore
export function txTransferWkdt({amount, to}, opts = {}) {
  invariant(amount != null, "transferWakandaToken({amount, to}) -- amount required")
  invariant(to != null, "transferWakandaToken({amount, to}) -- to required")

  return tx([
    transaction(CODE),
    args([
      arg(amount, t.UFix64),
      arg(to, t.Address),
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}