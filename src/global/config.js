import {config} from "@onflow/fcl"

config()
  .put("env", process.env.REACT_APP_CHAIN_ENV)
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE)
  .put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("0xWakandaProfile", process.env.REACT_APP_CONTRACT_WAKANDA_PROFILE)
  .put("0xWakandaToken", process.env.REACT_APP_CONTRACT_WAKANDA_TOKEN)
  .put("0xWakandaPass", process.env.REACT_APP_CONTRACT_WAKANDA_PASS)
  .put("0xFungibleToken", process.env.REACT_APP_CONTRACT_FUNGIBLE_TOKEN)
  .put("0xNonFungibleToken", process.env.REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN)
  .put("0xWakandaStorefront", process.env.REACT_APP_CONTRACT_WAKANDA_STOREFRONT)