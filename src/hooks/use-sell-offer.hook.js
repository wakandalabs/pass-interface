import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";
import {fetchSellOffer} from "../flow/script.fetch-sell-offer";
import {fetchSellOfferItem} from "../flow/script.fetch-sell-offer-item";
import {txRemoveSaleOffer} from "../flow/tx.remove-sale-offer";
import {txStorefrontCleanItem} from "../flow/tx.storefront-clean-item";

export const saleOfferAtom = atomFamily({
  key: "saleOffer::state",
  default: selectorFamily({
    key: "saleOffer::default",
    get: ({address, saleOfferResourceID}) => async () => fetchSellOffer(address, saleOfferResourceID),
  }),
})

export const saleOfferItemAtom = atomFamily({
  key: "saleOfferItem::state",
  default: selectorFamily({
    key: "saleOfferItem::default",
    get: ({address, saleOfferResourceID}) => async () => fetchSellOfferItem(address, saleOfferResourceID),
  }),
})

export const statusAtom = atomFamily({
  key: "saleOffer::status",
  default: IDLE,
})

export function useSellOfferHook(address, saleOfferResourceID) {
  const [saleOffer, setSaleOffer] = useRecoilState(saleOfferAtom({address, saleOfferResourceID}))
  const [saleOfferItem, setSaleOfferItem] = useRecoilState(saleOfferItemAtom({address, saleOfferResourceID}))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchSellOffer(address, saleOfferResourceID).then(setSaleOffer)
    await fetchSellOfferItem(address, saleOfferResourceID).then(setSaleOfferItem)
    setStatus(IDLE)
  }

  return {
    saleOffer,
    saleOfferItem,
    status,
    refresh,
    async removeSellOffer(){
      await txRemoveSaleOffer({saleOfferResourceID}, {
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
    async cleanItem(salePassID, salePassPrice) {
      await txStorefrontCleanItem({salePassID, salePassPrice}, {
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
  }
}
