import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront
transaction(saleOfferResourceID: UInt64, storefrontAddress: Address) {
  let storefront: &WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}

  prepare(acct: AuthAccount) {
    self.storefront = getAccount(storefrontAddress)
      .getCapability<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}>(
      WakandaStorefront.StorefrontPublicPath
    )!
  .borrow()
    ?? panic("Cannot borrow Storefront from provided address")
  }

  execute {
    // Be kind and recycle
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