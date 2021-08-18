import {send, decode, script, args, arg, cdc} from "@onflow/fcl";
import {Address} from "@onflow/types";

const CODE = cdc`

`

export function fetchWakandaPass(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
