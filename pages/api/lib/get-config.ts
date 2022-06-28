import { bytes, Long, units } from "@zilliqa-js/util";
import path from "path";


export const UPLOADS_DIR = path.join(process.cwd(), 'public/uploads');

const MAINNET_RPC_URL = "https://api.zilliqa.com/";
const MAINNET_CHAIN_ID = 1;
const TESTNET_RPC_URL = "https://dev-api.zilliqa.com/";
const TESTNET_CHAIN_ID = 333;
const MSG_VERSION = 1;
export const GAS_LIMIT = Long.fromNumber(80000);
export const GAS_PRICE = units.toQa("2000", units.Units.Li);

export default function getConfig(network?: "mainnet" | "testnet") {
  
  if (network == "mainnet") {
    return {
      rpcUrl: MAINNET_RPC_URL,
      chainId: MAINNET_CHAIN_ID,
      version: bytes.pack(MAINNET_CHAIN_ID, MSG_VERSION)
    }
  } else {
    return {
      rpcUrl: TESTNET_RPC_URL,
      chainId: TESTNET_CHAIN_ID,
      version: bytes.pack(TESTNET_CHAIN_ID, MSG_VERSION)
    }
  }

}