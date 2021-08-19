import {
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  LOADING,
  IDLE,
  PROCESSING,
  SUCCESS,
  ERROR,
  IDLE_DELAY,
} from "../global/constants";

import {sleep} from "../util/sleep";
import {scriptIsWakandaProfileInit} from "../flow/script.is-wakanda-profile-init";
import {txInitWakandaProfile} from "../flow/tx.init-wakanda-profile";

export const $status = atomFamily({
  key: "initwakandaprofile::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "initwakandaprofile::state",
  default: selectorFamily({
    key: "initwakandaprofile::default",
    get: address => () => scriptIsWakandaProfileInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "initwakandaprofile::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitWakandaProfileHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsWakandaProfileInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitWakandaProfile(address, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          recheck()
          setStatus(SUCCESS)
        },
        onError() {
          setStatus(ERROR)
        },
        async onComplete() {
          await sleep(IDLE_DELAY)
          setStatus(IDLE)
        },
      })
    },
  }
}
