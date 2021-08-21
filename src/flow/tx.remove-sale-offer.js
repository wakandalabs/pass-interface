import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

transaction(saleOfferResourceID: UInt64) {
    let storefront: &WakandaStorefront.Storefront{WakandaStorefront.StorefrontManager}

    prepare(acct: AuthAccount) {
        self.storefront = acct.borrow<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontManager}>(from: WakandaStorefront.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefront.Storefront")
    }

    execute {
        self.storefront.removeSaleOffer(saleOfferResourceID: saleOfferResourceID)
    }
}

`

export async function txRemoveSaleOffer({saleOfferResourceID}, opts = {}) {
  // prettier-ignore
  invariant(saleOfferResourceID != null, "no saleOfferResourceID")

  return tx(
    [
      transaction(CODE),
      args([
        arg(saleOfferResourceID, t.UInt64)
      ]),
      proposer(fcl.authz),
      payer(fcl.authz),
      authorizations([authz]),
      limit(1000),
    ],
    opts
  )
}
