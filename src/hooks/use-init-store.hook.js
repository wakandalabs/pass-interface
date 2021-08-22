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
import {scriptIsStorefrontInit} from "../flow/script.is-storefront-init";
import {txInitStorefront} from "../flow/tx.init-storefront";

export const $status = atomFamily({
  key: "init-store::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init-store::state",
  default: selectorFamily({
    key: "init-store::default",
    get: address => () => scriptIsStorefrontInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "init-store::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitStorefrontHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsStorefrontInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitStorefront(address, {
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
