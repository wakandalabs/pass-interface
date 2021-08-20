import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import WakandaToken from 0xWakandaToken

pub fun main(address: Address): Bool {
    return WakandaToken.check(address)
}
`

export function scriptIsWkdtInit(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
