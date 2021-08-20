import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import WakandaPass from 0xWakandaPass

pub fun main(address: Address): Bool {
    return WakandaPass.check(address)
}
`

export function scriptIsPassInit(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
