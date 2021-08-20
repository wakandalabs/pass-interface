import {fetchWkdtSupply} from "../flow/script.fetch-wkdt-supply";
import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";

export const supplyAtom = atomFamily({
  key: "wkdt-supply::state",
  default: selectorFamily({
    key: "wkdt-supply::default",
    get: () => async () => fetchWkdtSupply(),
  }),
})

export const statusAtom = atomFamily({
  key: "wkdt-supply::status",
  default: IDLE,
})

export function useWkdtSupplyHook() {
  const [supply, setSupply] = useRecoilState(supplyAtom())
  const [status, setStatus] = useRecoilState(statusAtom())

  return {
    supply,
    status,
    async refresh() {
      setStatus(PROCESSING)
      await fetchWkdtSupply().then(setSupply)
      setStatus(IDLE)
    },
  }
}