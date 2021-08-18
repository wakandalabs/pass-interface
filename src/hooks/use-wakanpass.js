import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {mintWakandaPass} from "../flow/transactions/mint-wakanda-pass";
import {fetchWakandaPass} from "../flow/scripts/get-wakanda-pass";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";

export const valueAtom = atomFamily({
  key: "wakandapass::state",
  default: selectorFamily({
    key: "wakandapass::default",
    get: address => async () => console.log(address),
  }),
})

export const statusAtom = atomFamily({
  key: "wakanda-pass::status",
  default: IDLE,
})

export function useWakandaPass(address) {
  const [pass, setPass] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    // await fetchWakandaPass(address).then(setPass)
    setStatus(IDLE)
  }

  return {
    // pass,
    status,
    // refresh,
    async mint(receiver, metadata) {
      await mintWakandaPass({receiver, metadata}, {
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
      })
    }
  }
}
