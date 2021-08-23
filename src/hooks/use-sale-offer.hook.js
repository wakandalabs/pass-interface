import {atomFamily, selectorFamily, useRecoilState} from "recoil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../global/constants";
import {sleep} from "../util/sleep";
import {fetchSellOfferItem} from "../flow/script.fetch-sale-offer-item";
import {txRemoveSaleOffer} from "../flow/tx.remove-sale-offer";
import {txStorefrontCleanItem} from "../flow/tx.storefront-clean-item";
import {txBuyPassWkdt} from "../flow/tx.buy-pass-wkdt";

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

export function useSaleOfferHook(address, saleOfferResourceID) {
  const [saleOfferItem, setSaleOfferItem] = useRecoilState(saleOfferItemAtom({address, saleOfferResourceID}))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchSellOfferItem(address, saleOfferResourceID).then(setSaleOfferItem)
    setStatus(IDLE)
  }

  return {
    saleOfferItem,
    status,
    refresh,
    async removeSellOffer(){
      await txRemoveSaleOffer({saleOfferResourceID}, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
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
    async buyPass() {
      await txBuyPassWkdt({saleOfferResourceID, address}, {
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
