import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {fetchWakandaProfile} from "../flow/scripts/get-wakanda-profile";
import {updateWakandaProfile} from "../flow/transactions/update-wakanda-profile";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";

export const valueAtom = atomFamily({
  key: "wakanda-profile::state",
  default: selectorFamily({
    key: "wakanda-profile::default",
    get: address => async () => fetchWakandaProfile(address),
  }),
})

export const statusAtom = atomFamily({
  key: "wakanda-profile::status",
  default: IDLE,
})

export function useWakandaProfile(address) {
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
      await updateWakandaProfile({profile}, {
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
