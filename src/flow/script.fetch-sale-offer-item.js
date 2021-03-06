import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address, UInt64} from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import WakandaStorefront from 0xWakandaStorefront
import WakandaPass from 0xWakandaPass

pub struct SaleItem {
    pub let item: WakandaPass.ReadOnly?
    pub let price: UFix64

    init(item: WakandaPass.ReadOnly?, price: UFix64) {
        self.item = item
        self.price = price
    }
}

pub fun main(address: Address, saleOfferResourceID: UInt64): SaleItem? {
    if let storefrontRef = getAccount(address)
        .getCapability<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}>(WakandaStorefront.StorefrontPublicPath).borrow() {
        
        if let saleOffer = storefrontRef.borrowSaleOffer(saleOfferResourceID: saleOfferResourceID) {
            let details = saleOffer.getDetails()
            let itemPrice = details.salePrice
            
            let item = WakandaPass.read(address: address, id: details.nftID)
            
            return SaleItem(item: item, price: itemPrice)
        }
    }
    return nil
}
`

export function fetchSellOfferItem(address, saleOfferResourceID) {
  if (address == null) return Promise.resolve(false)
  if (saleOfferResourceID == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address),
      arg(saleOfferResourceID, UInt64),
    ])
  ]).then(decode)
}
