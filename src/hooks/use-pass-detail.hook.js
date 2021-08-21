import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {fetchWakandaPassDetail} from "../flow/script.fetch-pass-detail";
import {txWithdrawAllFromPass} from "../flow/tx.withdraw-all-from-pass";
import {sleep} from "../util/sleep";
import {useWkdtBalanceHook} from "./use-wkdt-balance.hook";
import {txTransferWkdtToPass} from "../flow/tx.transfer-wkdt-to-pass";
import {txSellPassWkdt} from "../flow/tx.sell-pass-wkdt";

export const valueAtom = atomFamily({
  key: ({address, id}) => address + "-pass-id-" + id + "::state",
  default: selectorFamily({
    key: ({address, id}) => address + "-pass-id-" + id + "::default",
    get: ({address, id}) => async () => fetchWakandaPassDetail(address, id),
  }),
})

export const statusAtom = atomFamily({
  key: ({address, id}) => address + "-pass-id-" + id + "::status",
  default: IDLE,
})

export function useWakandaPassDetail(address, id) {
  const [pass, setPass] = useRecoilState(valueAtom({address, id}))
  const [status, setStatus] = useRecoilState(statusAtom(address))
  const wkdt = useWkdtBalanceHook(address)

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassDetail(address, id).then(setPass)
    setStatus(IDLE)
  }

  return {
    pass,
    status,
    refresh,
    async withdraw() {
      await txWithdrawAllFromPass({id}, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          await refresh()
          await wkdt.refresh()
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
    },
    async deposit(amount) {
      await txTransferWkdtToPass({amount, id}, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          await refresh()
          await wkdt.refresh()
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
    },
    async sell(salePassID, salePassPrice) {
      await txSellPassWkdt({salePassID, salePassPrice}, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          await refresh()
          await wkdt.refresh()
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
