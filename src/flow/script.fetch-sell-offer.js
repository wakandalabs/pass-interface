import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address, UInt64} from "@onflow/types";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

pub fun main(account: Address, saleOfferResourceID: UInt64): WakandaStorefront.SaleOfferDetails {
    let storefrontRef = account
        .getCapability<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}>(
            WakandaStorefront.StorefrontPublicPath
        )
        .borrow()
        ?? panic("Could not borrow public storefront from address")

    let saleOffer = storefrontRef.borrowSaleOffer(saleOfferResourceID: saleOfferResourceID)
        ?? panic("No item with that ID")
    
    return saleOffer.getDetails()
}
`

export function fetchSellOffer(account, saleOfferResourceID) {
  if (account == null) return Promise.resolve(false)
  if (saleOfferResourceID == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(account, Address),
      arg(saleOfferResourceID, UInt64),
    ])
  ]).then(decode)
}
