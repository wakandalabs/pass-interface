import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vibranium from 0xVibranium
  import WakandaItems from 0xWakandaItems
  import WakandaItemsMarket from 0xWakandaItemsMarket

  pub fun hasVibranium(_ address: Address): Bool {
    let receiver: Bool = getAccount(address)
      .getCapability<&Vibranium.Vault{FungibleToken.Receiver}>(Vibranium.ReceiverPublicPath)
      .check()

    let balance: Bool = getAccount(address)
      .getCapability<&Vibranium.Vault{FungibleToken.Balance}>(Vibranium.BalancePublicPath)
      .check()

    return receiver && balance
  }

  pub fun hasWakandaItems(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&WakandaItems.Collection{NonFungibleToken.CollectionPublic, WakandaItems.WakandaItemsCollectionPublic}>(WakandaItems.CollectionPublicPath)
      .check()
  }

  pub fun hasWakandaItemsMarket(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&WakandaItemsMarket.Collection{WakandaItemsMarket.CollectionPublic}>(WakandaItemsMarket.CollectionPublicPath)
      .check()
  }

  pub fun main(address: Address): {String: Bool} {
    let ret: {String: Bool} = {}
    ret["Vibranium"] = hasVibranium(address)
    ret["WakandaItems"] = hasWakandaItems(address)
    ret["WakandaItemsMarket"] = hasWakandaItemsMarket(address)
    return ret
  }
`

export function isAccountInitialized(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
