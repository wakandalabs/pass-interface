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
import {useFlowBalanceHook} from "./use-flow-balance.hook";
import {useWkdtBalanceHook} from "./use-wkdt-balance.hook";
import {scriptIsAccountInitialized} from "../flow/script.is-account-initialized";
import {txInitializeAccount} from "../flow/tx.initialize-account";

export const $status = atomFamily({
  key: "init::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init::state",
  default: selectorFamily({
    key: "init::default",
    get: address => () => scriptIsAccountInitialized(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "init::computed",
  get:
    address =>
      async ({get}) => {
        const all = get($init(address))

        return all.WakandaToken  && all.WakandaPass && all.WakandaProfile
      },
})

export function useInitializedHook(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))
  const flow = useFlowBalanceHook(address)
  const wkdt = useWkdtBalanceHook(address)

  function recheck() {
    scriptIsAccountInitialized(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await txInitializeAccount(address, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          recheck()
          await flow.refresh()
          await wkdt.refresh()
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
