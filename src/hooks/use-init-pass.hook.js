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
import {scriptIsPassInit} from "../flow/script.is-pass-init";
import {txInitPass} from "../flow/tx.init-pass";

export const $status = atomFamily({
  key: "init-pass::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init-pass::state",
  default: selectorFamily({
    key: "init-pass::default",
    get: address => () => scriptIsPassInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "init-pass::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitPassHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsPassInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitPass(address, {
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
