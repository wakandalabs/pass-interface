import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const CODE = cdc`
import WakandaToken from 0xWakandaToken
import NonFungibleToken from 0xNonFungibleToken
import WakandaPass from 0xWakandaPass

transaction(receiver: Address, metadata: {String: String}, lockupAmount: UFix64, lockupSchedule: {UFix64: UFix64}) {

    prepare(signer: AuthAccount) {
        let minter = signer
            .borrow<&WakandaPass.NFTMinter>(from: WakandaPass.MinterStoragePath)
            ?? panic("Signer is not the admin")

        let nftCollectionRef = getAccount(receiver).getCapability(WakandaPass.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic, WakandaPass.CollectionPublic}>()
            ?? panic("Could not borrow WakandaPass collection public reference")

        let wkdtVaultRef = signer
            .borrow<&WakandaToken.Vault>(from: WakandaToken.TokenStoragePath)
            ?? panic("Cannot get WKDT vault reference")

        let wkdtVault <- wkdtVaultRef.withdraw(amount: lockupAmount)

        minter.mintNFTWithCustomLockup(
            recipient: nftCollectionRef,
            metadata: metadata,
            vault: <- wkdtVault,
            lockupSchedule: lockupSchedule
        )
    }
}
`

export async function txMintPassCustom({receiver, metadata, lockupAmount, lockupSchedule}, opts = {}) {
  // prettier-ignore
  invariant(receiver != null, "Tried to initialize an wakandapass but no receiver")
  invariant(metadata != null, "Tried to initialize an wakandapass but no metadata")
  invariant(lockupAmount != null, "Tried to initialize an wakandapass but no lockupAmount")
  invariant(lockupSchedule != null, "Tried to initialize an wakandapass but no lockupSchedule")

  return tx(
    [
      transaction(CODE),
      args([
        arg(receiver, t.Address),
        arg(metadata, t.Dictionary({key: t.String, value: t.String})),
        arg(lockupAmount.toString(), t.UFix64),
        arg(lockupSchedule, t.Dictionary({key: t.UFix64, value: t.UFix64}))
      ]),
      proposer(fcl.authz),
      payer(fcl.authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}
