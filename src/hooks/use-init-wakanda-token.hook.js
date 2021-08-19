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
import {scriptIsWakandaTokenInit} from "../flow/script.is-wakanda-token-init";
import {txInitWakandaToken} from "../flow/tx.init-wakanda-token";

export const $status = atomFamily({
  key: "initwakandatoken::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "initwakandatoken::state",
  default: selectorFamily({
    key: "initwakandatoken::default",
    get: address => () => scriptIsWakandaTokenInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "initwakandatoken::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitWakandaTokenHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsWakandaTokenInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitWakandaToken(address, {
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
