import {transaction, limit, proposer, payer, authorizations, authz, cdc, args, arg} from "@onflow/fcl";
import * as t from "@onflow/types";
import {tx} from "./util/tx";
import {invariant} from "@onflow/util-invariant";

const CODE = cdc`
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
export function txUpdateProfile({profile}, opts = {}) {
  invariant(profile.name != null, "txUpdateProfile() -- name required")
  invariant(profile.avatar != null, "txUpdateProfile() -- avatar required")
  invariant(profile.color != null, "txUpdateProfile() -- color required")
  invariant(profile.bio != null, "txUpdateProfile() -- bio required")
  invariant(profile.website != null, "txUpdateProfile() -- website required")
  invariant(profile.email != null, "txUpdateProfile() -- email required")

  return tx([
    transaction(CODE),
    args([
      arg(profile.name, t.String),
      arg(profile.avatar, t.String),
      arg(profile.color, t.String),
      arg(profile.bio, t.String),
      arg(profile.website, t.String),
      arg(profile.email, t.String)
    ]),
    proposer(authz),
    payer(authz),
    authorizations([authz]),
    limit(1000),
  ], opts)
}