import { NextApiRequest, NextApiResponse } from "next"
import initProvider from "./lib/init-provider";
import { scillaJSONParams } from "@zilliqa-js/scilla-json-utils";
import { BN } from "@zilliqa-js/util"
import getConfig, { GAS_LIMIT, GAS_PRICE } from "./lib/get-config";
import { ZERO_ADDRESS } from './lib/utils';
import getErrorCause from './lib/get-error-cause';
import { AdminRequest } from "../../lib/types";
import parseAddress from "./lib/parse-address";

interface Request extends NextApiRequest {
  body: AdminRequest
}

export default async function handler(req: Request, res: NextApiResponse) {

  if (req.method == "POST") {

    let {
      network,
      contractAddress,
      transition
    } = req.body;

    try {

      const zilliqa = await initProvider(network, true);
      const { version } = getConfig(network);
      const contractAddressParsed = parseAddress(contractAddress)
      const contract = zilliqa.contracts.at(contractAddressParsed);
      
      if (transition.params.to) {
        transition.params.to[1] = parseAddress(transition.params.to[1])
      }

      const txParams = {
        version: version,
        amount: new BN(0),
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT
      }

      const { txParams: { receipt } } = await contract.call(
        transition.name,
        scillaJSONParams(transition.params),
        txParams
      )

      if (receipt && receipt.exceptions) {
        let errorCause = getErrorCause(receipt.exceptions[0].message);
        throw new Error(errorCause);
      }
      
      res.status(200).json({
        success: receipt?.success,
        message: "Transition executed successfully"
      });

    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    }
  } else {
    res.status(405).json({ error: "REQ_METHOD_NOT_ALLOWED" });
  }
}