import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {fetchWkdtBalance} from "../flow/scripts/get-wkdt-balance";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {transferWkdt} from "../flow/transactions/transfer-wkdt";
import {sleep} from "../util/sleep";

export const valueAtom = atomFamily({
  key: "wkdt-balance::state",
  default: selectorFamily({
    key: "wkdt-balance::default",
    get: address => async () => fetchWkdtBalance(address),
  }),
})

export const statusAtom = atomFamily({
  key: "wkdt-balance::status",
  default: IDLE,
})

export function useWkdtBalance(address) {
  const [balance, setBalance] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWkdtBalance(address).then(setBalance)
    setStatus(IDLE)
  }

  return {
    balance,
    status,
    refresh,
    async mint(amount) {
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_VIBRANIUM_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: address,
          amount: amount,
        }),
      })
      await fetchWkdtBalance(address).then(setBalance)
      setStatus(IDLE)
    },

    async transfer(amount, to) {
      await transferWkdt(
        {amount: amount, to: to},
        {
          onStart() {
            setStatus(PROCESSING)
          },
          async onSuccess() {
            await refresh()
            setStatus(SUCCESS)
          },
          async onComplete() {
            await sleep(IDLE_DELAY)
            setStatus(IDLE)
          },
          async onError() {
            setStatus(ERROR)
          },
        }
      )
    }
  }
}
