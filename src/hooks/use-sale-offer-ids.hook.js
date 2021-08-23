import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {IDLE, PROCESSING} from "../global/constants";
import {fetchSaleOfferIds} from "../flow/script.fetch-sale-offer-ids";

export const valueAtom = atomFamily({
  key: "saleOfferIds::state",
  default: selectorFamily({
    key: "saleOfferIds::default",
    get: address => async () => fetchSaleOfferIds(address),
  }),
})

export const statusAtom = atomFamily({
  key: "saleOfferIds::status",
  default: IDLE,
})

export function useSaleOfferIdsHook(address) {
  const [saleOfferIds, setSaleOfferIds] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchSaleOfferIds(address).then(setSaleOfferIds)
    setStatus(IDLE)
  }

  return {
    saleOfferIds,
    status,
    refresh
  }
}
