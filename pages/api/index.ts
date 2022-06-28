
import { isBech32 } from '@zilliqa-js/util/dist/validation';
import { fromBech32Address } from '@zilliqa-js/zilliqa';
import { NextApiResponse, NextApiRequest } from 'next';
import initProvider from './lib/init-provider';
export default function handler(req: NextApiResponse, res: NextApiResponse) {
  
  try {
    
    const zilliqa = initProvider("testnet", true);
    const isb32 = isBech32("zil1uvyxrqf4eqdep4qx2dfm2j6klgz6vvtvyc8enz")
    console.log(isb32)

    const addressParsed = fromBech32Address("zil1uvyxrqf4eqdep4qx2dfm2j6klgz6vvtvyc8enz")
    console.log(addressParsed);
    

    res.status(200).json({message: "arre"})




  } catch (error: any) {
    res.status(500).json({error: error.message, message: error.message})
  }



}