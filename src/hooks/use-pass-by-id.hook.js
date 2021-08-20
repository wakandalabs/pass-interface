import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";
import {fetchWakandaPassById} from "../flow/script.fetch-pass-by-id";

export const valueAtom = atomFamily({
  key: "pass-by-id::state",
  default: selectorFamily({
    key: "pass-by-id::default",
    get: ({address, id}) => async () => fetchWakandaPassById(address, id),
  }),
})

export const statusAtom = atomFamily({
  key: "pass-by-id::status",
  default: IDLE,
})

export function useWakandaPassById(address, id) {
  const [pass, setPass] = useRecoilState(valueAtom({address, id}))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassById(address, id).then(setPass)
    setStatus(IDLE)
  }

  return {
    pass,
    status,
    refresh
  }
}
