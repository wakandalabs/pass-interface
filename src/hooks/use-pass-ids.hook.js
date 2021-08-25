import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {fetchWakandaPassIds} from "../flow/script.fetch-pass-ids";
import {txMintPass} from "../flow/tx.mint-pass";
import {sleep} from "../util/sleep";
import {txMintPassCustom} from "../flow/tx.mint-pass-custom";

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

export const txAtom = atomFamily({
  key: "pass-mint::tx",
  default: null,
})

export function useWakandaPassIds(address) {
  const [ids, setIds] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))
  const [tx, setTx] = useRecoilState(txAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchWakandaPassIds(address).then(setIds)
    setStatus(IDLE)
  }

  return {
    ids,
    status,
    tx,
    refresh,
    async mint(receiver, metadata) {
      const tx = await txMintPass({receiver, metadata}, {
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
      console.log(tx)
      setTx(tx)
    },
    async mintWithCustom(receiver, metadata, lockupAmount, lockupSchedule) {
      const tx = await txMintPassCustom({receiver, metadata, lockupAmount, lockupSchedule}, {
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
      console.log(tx)
      setTx(tx)
    },
    resetTx(){
      setTx(null)
    }
  }
}
