import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {fetchWakandaProfile} from "../flow/script.fetch-profile";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";
import {fetchSellOfferIds} from "../flow/script.fetch-sell-offer-ids";

export const valueAtom = atomFamily({
  key: "saleOfferIds::state",
  default: selectorFamily({
    key: "saleOfferIds::default",
    get: address => async () => fetchSellOfferIds(address),
  }),
})

export const statusAtom = atomFamily({
  key: "saleOfferIds::status",
  default: IDLE,
})

export function useSellOfferIdsHook(address) {
  const [saleOfferIds, setSaleOfferIds] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchSellOfferIds(address).then(setSaleOfferIds)
    setStatus(IDLE)
  }

  return {
    saleOfferIds,
    status,
    refresh,
    async removeSellOffer(){

    },
    async cleanItem() {

    },
  }
}
