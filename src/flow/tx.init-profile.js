import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl";
import {invariant} from "@onflow/util-invariant";
import {tx} from "./util/tx";

const CODE = cdc`
import WakandaProfile from 0xWakandaProfile

transaction {
  prepare(signer: AuthAccount) {
    if !WakandaProfile.check(signer.address) {
      if signer.borrow<&WakandaProfile.WakandaProfileBase>(from: WakandaProfile.ProfileStoragePath) ==nil {
        signer.save(<- WakandaProfile.new(), to: WakandaProfile.ProfileStoragePath)
        signer.link<&WakandaProfile.WakandaProfileBase{WakandaProfile.WakandaProfilePublic}>(WakandaProfile.ProfilePublicPath, target: WakandaProfile.ProfileStoragePath)
      }
    }
  }
}
`

export async function txInitProfile(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(70),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
