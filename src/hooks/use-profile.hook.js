import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {fetchWakandaProfile} from "../flow/script.fetch-profile";
import {txUpdateProfile} from "../flow/tx.update-profile";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";

export const valueAtom = atomFamily({
  key: "profile::state",
  default: selectorFamily({
    key: "profile::default",
    get: address => async () => fetchWakandaProfile(address),
  }),
})

export const statusAtom = atomFamily({
  key: "profile::status",
  default: IDLE,
})

export function useProfileHook(address) {
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
    async update(profile) {
      await txUpdateProfile({profile}, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          await refresh()
          setStatus(SUCCESS)
        },
        async onComplete() {
          await sleep(IDLE_DELAY)
          setStatus(IDLE)
        },
        async onError() {
          setStatus(ERROR)
        },
      })
    }
  }
}
