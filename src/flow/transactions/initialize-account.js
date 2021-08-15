import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "../util/tx";

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vibranium from 0xVibranium
  import WakandaItems from 0xWakandaItems
  import WakandaItemsMarket from 0xWakandaItemsMarket

  pub fun hasVibranium(_ address: Address): Bool {
    let receiver = getAccount(address)
      .getCapability<&Vibranium.Vault{FungibleToken.Receiver}>(Vibranium.ReceiverPublicPath)
      .check()

    let balance = getAccount(address)
      .getCapability<&Vibranium.Vault{FungibleToken.Balance}>(Vibranium.BalancePublicPath)
      .check()

    return receiver && balance
  }

  pub fun hasItems(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&WakandaItems.Collection{NonFungibleToken.CollectionPublic, WakandaItems.WakandaItemsCollectionPublic}>(WakandaItems.CollectionPublicPath)
      .check()
  }

  pub fun hasMarket(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&WakandaItemsMarket.Collection{WakandaItemsMarket.CollectionPublic}>(WakandaItemsMarket.CollectionPublicPath)
      .check()
  }

  transaction {
    prepare(acct: AuthAccount) {
      if !hasVibranium(acct.address) {
        if acct.borrow<&Vibranium.Vault>(from: Vibranium.VaultStoragePath) == nil {
          acct.save(<-Vibranium.createEmptyVault(), to: Vibranium.VaultStoragePath)
        }
        acct.unlink(Vibranium.ReceiverPublicPath)
        acct.unlink(Vibranium.BalancePublicPath)
        acct.link<&Vibranium.Vault{FungibleToken.Receiver}>(Vibranium.ReceiverPublicPath, target: Vibranium.VaultStoragePath)
        acct.link<&Vibranium.Vault{FungibleToken.Balance}>(Vibranium.BalancePublicPath, target: Vibranium.VaultStoragePath)
      }

      if !hasItems(acct.address) {
        if acct.borrow<&WakandaItems.Collection>(from: WakandaItems.CollectionStoragePath) == nil {
          acct.save(<-WakandaItems.createEmptyCollection(), to: WakandaItems.CollectionStoragePath)
        }
        acct.unlink(WakandaItems.CollectionPublicPath)
        acct.link<&WakandaItems.Collection{NonFungibleToken.CollectionPublic, WakandaItems.WakandaItemsCollectionPublic}>(WakandaItems.CollectionPublicPath, target: WakandaItems.CollectionStoragePath)
      }

      if !hasMarket(acct.address) {
        if acct.borrow<&WakandaItemsMarket.Collection>(from: WakandaItemsMarket.CollectionStoragePath) == nil {
          acct.save(<-WakandaItemsMarket.createEmptyCollection(), to: WakandaItemsMarket.CollectionStoragePath)
        }
        acct.unlink(WakandaItemsMarket.CollectionPublicPath)
        acct.link<&WakandaItemsMarket.Collection{WakandaItemsMarket.CollectionPublic}>(WakandaItemsMarket.CollectionPublicPath, target:WakandaItemsMarket.CollectionStoragePath)
      }
    }
  }
`

export async function initializeAccount(address, opts = {}) {
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
