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
import {scriptIsProfileInit} from "../flow/script.is-profile-init";
import {txInitProfile} from "../flow/tx.init-profile";

export const $status = atomFamily({
  key: "initwakandaprofile::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "initwakandaprofile::state",
  default: selectorFamily({
    key: "initwakandaprofile::default",
    get: address => () => scriptIsProfileInit(address),
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

export function useInitProfileHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsProfileInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitProfile(address, {
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
