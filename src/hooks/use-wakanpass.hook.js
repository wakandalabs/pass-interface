import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {txMintWakandaPass} from "../flow/tx.mint-wakanda-pass";
import {fetchWakandaPassAllDetail} from "../flow/script.get-wakanda-pass-all";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";
import {txMintWakandaPassCustom} from "../flow/tx.mint-wakanda-pass-custom";

export const valueAtom = atomFamily({
  key: "wakandapass::state",
  default: selectorFamily({
    key: "wakandapass::default",
    get: address => async () => fetchWakandaPassAllDetail(address),
  }),
})

export const statusAtom = atomFamily({
  key: "wakandapass::status",
  default: IDLE,
})

export function useWakandaPass(address) {
  const [pass, setPass] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassAllDetail(address).then(setPass)
    setStatus(IDLE)
  }

  return {
    pass,
    status,
    refresh,
    async mint(receiver, metadata) {
      await txMintWakandaPass({receiver, metadata}, {
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
    },
    async mintWithCustom(receiver, metadata, lockupAmount, lockupSchedule) {
      await txMintWakandaPassCustom({receiver, metadata, lockupAmount, lockupSchedule},{
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
