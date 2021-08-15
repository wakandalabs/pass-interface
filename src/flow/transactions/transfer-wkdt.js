import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "../util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = fcl.cdc`
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
export function transferWkdt({amount, to}, opts = {}) {
  invariant(amount != null, "transferWakandaToken({amount, to}) -- amount required")
  invariant(to != null, "transferWakandaToken({amount, to}) -- to required")

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(amount.toFixed(8).toString(), t.UFix64),
      fcl.arg(to, t.Address),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}