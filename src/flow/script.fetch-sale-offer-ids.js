import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

// This script returns an array of all the NFTs uuids for sale through a Storefront

pub fun main(address: Address): [UInt64] {
    let storefrontRef = getAccount(address)
        .getCapability<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}>(
            WakandaStorefront.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")
    
    return storefrontRef.getSaleOfferIDs()
}
`

export function fetchSaleOfferIds(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
