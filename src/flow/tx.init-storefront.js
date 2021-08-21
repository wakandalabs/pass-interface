import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";

const CODE = cdc`
import WakandaStorefront from 0xWakandaStorefront

transaction {
    prepare(acct: AuthAccount) {

        // If the account doesn't already have a Storefront
        if acct.borrow<&WakandaStorefront.Storefront>(from: WakandaStorefront.StorefrontStoragePath) == nil {

            // Create a new empty .Storefront
            let storefront <- WakandaStorefront.createStorefront() as @WakandaStorefront.Storefront
            
            // save it to the account
            acct.save(<-storefront, to: WakandaStorefront.StorefrontStoragePath)

            // create a public capability for the .Storefront
            acct.link<&WakandaStorefront.Storefront{WakandaStorefront.StorefrontPublic}>(WakandaStorefront.StorefrontPublicPath, target: WakandaStorefront.StorefrontStoragePath)
        }
    }
}
`

export async function txInitStorefront(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(70),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
