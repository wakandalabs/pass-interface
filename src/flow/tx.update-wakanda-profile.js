import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
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
export function txUpdateWakandaProfile({profile}, opts = {}) {
  invariant(profile.name != null, "txUpdateWakandaProfile() -- name required")
  invariant(profile.avatar != null, "txUpdateWakandaProfile() -- avatar required")
  invariant(profile.color != null, "txUpdateWakandaProfile() -- color required")
  invariant(profile.bio != null, "txUpdateWakandaProfile() -- bio required")
  invariant(profile.website != null, "txUpdateWakandaProfile() -- website required")
  invariant(profile.email != null, "txUpdateWakandaProfile() -- email required")

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(profile.name, t.String),
      fcl.arg(profile.avatar, t.String),
      fcl.arg(profile.color, t.String),
      fcl.arg(profile.bio, t.String),
      fcl.arg(profile.website, t.String),
      fcl.arg(profile.email, t.String)
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}