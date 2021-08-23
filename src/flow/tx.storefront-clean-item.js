import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

transaction(saleOfferResourceID: UInt64) {
  let storefront: &WakandaStorefront.Storefront{WakandaStorefront.StorefrontManager}

  prepare(acct: AuthAccount) {
    self.storefront = acct.borrow<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontManager}>(from: WakandaStorefront.StorefrontStoragePath)
    ?? panic("Missing or mis-typed WakandaStorefront.Storefront")
  }

  execute {
    self.storefront.cleanup(saleOfferResourceID: saleOfferResourceID)
  }
}
`


// prettier-ignore
export function txStorefrontCleanItem({salePassID, salePassPrice}, opts = {}) {
  invariant(salePassID != null, "transferWakandaToken({amount, to}) -- amount required")
  invariant(salePassPrice != null, "transferWakandaToken({amount, to}) -- to required")

  return tx([
    transaction(CODE),
    args([
      arg(salePassID, t.UInt64),
      arg(salePassPrice, t.UFix64),
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}