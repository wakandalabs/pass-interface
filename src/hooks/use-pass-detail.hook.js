import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";
import {fetchWakandaPassDetail} from "../flow/script.fetch-pass-detail";

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

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassDetail(address, id).then(setPass)
    setStatus(IDLE)
  }

  return {
    pass,
    status,
    refresh
  }
}
