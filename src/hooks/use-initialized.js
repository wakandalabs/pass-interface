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
import {useFlowBalance} from "./use-flow-balance";
import {useWkdtBalance} from "./use-wkdt-balance";
import {isAccountInitialized} from "../flow/scripts/is-account-initialized";
import {initializeAccount} from "../flow/transactions/initialize-account";

export const $status = atomFamily({
  key: "init::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init::state",
  default: selectorFamily({
    key: "init::default",
    get: address => () => isAccountInitialized(address),
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

export function useInitialized(address) {
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))
  const flow = useFlowBalance(address)
  const wkdt = useWkdtBalance(address)

  function recheck() {
    isAccountInitialized(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize() {
      await initializeAccount(address, {
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
