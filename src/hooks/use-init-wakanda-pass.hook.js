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
import {scriptIsWakandaPassInit} from "../flow/script.is-wakanda-pass-init";
import {txInitWakandaPass} from "../flow/tx.init-wakanda-pass";

export const $status = atomFamily({
  key: "initwakandapass::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "initwakandapass::state",
  default: selectorFamily({
    key: "initwakandapass::default",
    get: address => () => scriptIsWakandaPassInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "initwakandapass::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitWakandaPassHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsWakandaPassInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitWakandaPass(address, {
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
