import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address, UInt64} from "@onflow/types";

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import WakandaPass from 0xWakandaPass

pub fun main(address: Address, id: UInt64): {String: String} {
    let collectionRef = getAccount(address).getCapability(WakandaPass.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic, WakandaPass.CollectionPublic}>()
        ?? panic("Could not borrow collection public reference")

    let ids = collectionRef.getIDs()
    let wakandaPass = collectionRef.borrowWakandaPassPublic(id: ids[0])

    return wakandaPass.getMetadata()
}
`

export function fetchWakandaPassById(address, id) {
  if (address == null) return Promise.resolve(false)
  if (id == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address),
      arg(id, UInt64)
    ])
  ]).then(decode)
}