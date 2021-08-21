import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import WakandaToken from 0xWakandaToken
import WakandaPass from 0xWakandaPass
import WakandaStorefront from 0xWakandaStorefront

transaction(salePassID: UInt64, salePassPrice: UFix64) {

    let wakandaTokenReceiver: Capability<&WakandaToken.Vault{FungibleToken.Receiver}>
    let wakandaPassProvider: Capability<&{WakandaPass.CollectionPublic}>
    let storefront: &WakandaStorefront.Storefront

    prepare(account: AuthAccount) {
   
        self.wakandaTokenReceiver = account.getCapability<&WakandaToken.Vault{FungibleToken.Receiver}>(WakandaToken.TokenPublicReceiverPath)!
        
        assert(self.wakandaTokenReceiver.borrow() != nil, message: "Missing or mis-typed WakandaToken receiver")

        if !getAccount(address)
            .getCapability<&{WakandaPass.CollectionPublic}>(WakandaPass.CollectionPublicPath)
            .check() {
            account.link<&{NonFungibleToken.CollectionPublic, WakandaPass.CollectionPublic}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )
        }

        self.wakandaPassProvider = account.getCapability<&{WakandaPass.CollectionPublic}>(WakandaPass.CollectionPublicPath)!
        assert(self.wakandaPassProvider.borrow() != nil, message: "Missing or mis-typed WakandaPass.Collection provider")

        self.storefront = account.borrow<&WakandaStorefront.Storefront>(from: WakandaStorefront.StorefrontStoragePath)
            ?? panic("Missing or mis-typed WakandaStorefront Storefront")
    }

    execute {
        let saleCut = WakandaStorefront.SaleCut(
            receiver: self.wakandaTokenReceiver,
            amount: salePassPrice
        )
        self.storefront.createSaleOffer(
            nftProviderCapability: self.wakandaPassProvider,
            nftType: Type<@WakandaPass.NFT>(),
            nftID: salePassID,
            salePaymentVaultType: Type<@WakandaToken.Vault>(),
            saleCuts: [saleCut]
        )
    }
}

`

// prettier-ignore
export function txSellPassWkdt({salePassID, salePassPrice}, opts = {}) {
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