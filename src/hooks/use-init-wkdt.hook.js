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
import {scriptIsWkdtInit} from "../flow/script.is-wkdt-init";
import {txInitWkdt} from "../flow/tx.init-wkdt";

export const $status = atomFamily({
  key: "init-wkdt::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init-wkdt::state",
  default: selectorFamily({
    key: "init-wkdt::default",
    get: address => () => scriptIsWkdtInit(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "init-wkdt::computed",
  get:
    address =>
      async ({get}) => {
        return get($init(address))
      },
})

export function useInitWkdtHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  function recheck() {
    scriptIsWkdtInit(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitWkdt(address, {
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
