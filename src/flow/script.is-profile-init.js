import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import WakandaProfile from 0xWakandaProfile

pub fun main(address: Address): Bool {
    return WakandaProfile.check(address)
}
`

export function scriptIsProfileInit(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
