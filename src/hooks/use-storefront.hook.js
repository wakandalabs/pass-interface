import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {fetchWakandaProfile} from "../flow/script.fetch-profile";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";

export const valueAtom = atomFamily({
  key: "storefront::state",
  default: selectorFamily({
    key: "storefront::default",
    get: address => async () => fetchWakandaProfile(address),
  }),
})

export const statusAtom = atomFamily({
  key: "storefront::status",
  default: IDLE,
})

export function useStorefrontHook(address) {
  const [profile, setProfile] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaProfile(address).then(setProfile)
    setStatus(IDLE)
  }

  return {
    profile,
    status,
    refresh,
    async buy(profile) {

    },
  }
}
