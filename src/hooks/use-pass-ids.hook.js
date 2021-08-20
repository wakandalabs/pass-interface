import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";
import {fetchWakandaPassIds} from "../flow/script.fetch-pass-ids";

export const valueAtom = atomFamily({
  key: "pass-ids::state",
  default: selectorFamily({
    key: "pass-ids::default",
    get: address => async () => fetchWakandaPassIds(address),
  }),
})

export const statusAtom = atomFamily({
  key: "pass-ids::status",
  default: IDLE,
})

export function useWakandaPassIds(address) {
  const [ids, setIds] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassIds(address).then(setIds)
    setStatus(IDLE)
  }

  return {
    ids,
    status,
    refresh
  }
}
