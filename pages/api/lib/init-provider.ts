import { Zilliqa } from '@zilliqa-js/zilliqa';
import getConfig from './get-config';



export default async function initProvider(network: "mainnet" | "testnet", withSigner?: boolean) {
  
  const { rpcUrl } = getConfig(network);
  
  const zilliqa = new Zilliqa(rpcUrl);
  
  if(withSigner) {
    if (!process.env.WALLET_PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY_NOT_DEFINED");
    }
    zilliqa.wallet.addByPrivateKey(process.env.WALLET_PRIVATE_KEY);
  }

  return zilliqa;

}