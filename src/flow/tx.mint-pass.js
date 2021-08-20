import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import WakandaPass from 0xWakandaPass

transaction(address: Address, metadata: {String: String}) {

    prepare(signer: AuthAccount) {
        let minter = signer
            .borrow<&WakandaPass.NFTMinter>(from: WakandaPass.MinterStoragePath)
            ?? panic("Signer is not the admin")

        let nftCollectionRef = getAccount(address).getCapability(WakandaPass.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow WakandaPass collection public reference")
        
        minter.mintNFT(recipient: nftCollectionRef, metadata: metadata)
    }
}
`

export async function txMintPass({receiver, metadata}, opts = {}) {
  // prettier-ignore
  invariant(receiver != null, "Tried to initialize an wakandapass but no address")
  invariant(metadata != null, "Tried to initialize an wakandapass but no metadata")

  return tx(
    [
      transaction(CODE),
      args([
        arg(receiver, t.Address),
        arg(metadata, t.Dictionary({key: t.String, value: t.String})),
      ]),
      proposer(fcl.authz),
      payer(fcl.authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}
