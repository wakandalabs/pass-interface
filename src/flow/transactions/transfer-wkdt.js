import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "../util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = fcl.cdc`
import FungibleToken from 0xFungibleToken
import Vibranium from 0xVibranium

transaction(amount: UFix64, to: Address) {

    // The Vault resource that holds the tokens that are being transferred
    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        // Get a reference to the signer's stored vault
        let vaultRef = signer.borrow<&Vibranium.Vault>(from: Vibranium.VaultStoragePath)
      ?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Get the recipient's public account object
        let recipient = getAccount(to)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.getCapability(Vibranium.ReceiverPublicPath)!.borrow<&{FungibleToken.Receiver}>()
      ?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <-self.sentVault)
    }
}
`

// prettier-ignore
export function transferVibranium({amount, to}, opts = {}) {
  invariant(amount != null, "transferVibranium({amount, to}) -- amount required")
  invariant(to != null, "transferVibranium({amount, to}) -- to required")

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