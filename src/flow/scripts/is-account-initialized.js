import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
  import WakandaToken from 0xWakandaToken
  import WakandaPass from 0xWakandaPass

  pub fun hasWakandaToken(_ address: Address): Bool {
    let receiver: Bool = getAccount(address)
      .getCapability(/public/wakandaTokenReceiver)
      .check()

    let balance: Bool = getAccount(address)
      .getCapability(/public/wakandaTokenBalance)
      .check()

    return receiver && balance
  }

  pub fun hasWakandaPass(_ address: Address): Bool {
    return getAccount(address)
      .getCapability(/public/wakandaPassCollection)
      .check()
  }

  pub fun main(address: Address): {String: Bool} {
    let ret: {String: Bool} = {}
    ret["WakandaToken"] = hasWakandaToken(address)
    ret["WakandaPass"] = hasWakandaPass(address)
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
