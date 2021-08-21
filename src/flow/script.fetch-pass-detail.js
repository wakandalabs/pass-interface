import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address, UInt64} from "@onflow/types";

const CODE = cdc`
import WakandaPass from 0xWakandaPass

pub fun main(address: Address, id: UInt64): WakandaPass.ReadOnly? {
    return WakandaPass.read(address: address, id: id)
}
`

export function fetchWakandaPassDetail(address, id) {
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
