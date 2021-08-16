import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "../util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = fcl.cdc`
import WakandaProfile from 0xWakandaProfile

transaction(name: String, avatar: String, color: String, bio: String, website: String, email: String) {
  prepare(currentUser: AuthAccount) {
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setName(name)
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setAvatar(avatar)
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setColor(color)
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setBio(bio)
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setWebsite(website)
    currentUser
      .borrow<&{WakandaProfile.WakandaProfileOwner}>(from: WakandaProfile.ProfileStoragePath)!
      .setEmail(email)
  }
}
`

// prettier-ignore
export function updateWakandaProfile({name, avatar, color, bio, website, email}, opts = {}) {
  invariant(name != null, "updateWakandaProfile() -- name required")
  invariant(avatar != null, "updateWakandaProfile() -- avatar required")
  invariant(color != null, "updateWakandaProfile() -- color required")
  invariant(bio != null, "updateWakandaProfile() -- bio required")
  invariant(website != null, "updateWakandaProfile() -- website required")
  invariant(email != null, "updateWakandaProfile() -- email required")

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(name, t.String),
      fcl.arg(avatar, t.String),
      fcl.arg(color, t.String),
      fcl.arg(bio, t.String),
      fcl.arg(website, t.String),
      fcl.arg(email, t.String)
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}