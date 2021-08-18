import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
import WakandaPass from 0xWakandaPass
import WakandaToken from 0xWakandaToken
import WakandaProfile from 0xWakandaProfile

pub fun main(address: Address): {String: Bool} {
    let ret: {String: Bool} = {}
    ret["WakandaProfile"] = WakandaProfile.check(address)
    ret["WakandaToken"] = WakandaToken.check(address)
    ret["WakandaPass"] = WakandaPass.check(address)
    return ret
}
`

export function scriptIsAccountInitialized(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
