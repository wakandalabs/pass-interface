import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`
import WakandaProfile from 0xWakandaProfile

pub fun main(address: Address): WakandaProfile.ReadOnly? {
  return WakandaProfile.read(address)
}
`

export function fetchWakandaProfile(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
