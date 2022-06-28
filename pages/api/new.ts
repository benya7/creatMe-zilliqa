import { NewRequest } from './../../lib/types';
import { NextApiRequest, NextApiResponse } from "next"
import initProvider from "./lib/init-provider";
import fs from "fs"
import path from "path";
import { scillaJSONParams } from "@zilliqa-js/scilla-json-utils";
import { BN, Long, units } from "@zilliqa-js/util"
import getConfig from "./lib/get-config";
import getErrorCause from './lib/get-error-cause';

export const GAS_LIMIT = Long.fromNumber(80000);
export const GAS_PRICE = units.toQa("2000", units.Units.Li);

interface Request extends NextApiRequest {
  body: NewRequest
}

export default async function handler(req: Request, res: NextApiResponse) {

  if (req.method == "POST") {

    const { network, initialUri, name, symbol } = req.body;
    let { version } = getConfig(network);
    let contractPath = path.join(process.cwd(), "contracts");

    try {

      const zilliqa = await initProvider(network, true);
      let address = zilliqa.wallet.defaultAccount?.address;
      let contractCode = fs.readFileSync(path.join(contractPath, "zrc6.scilla"), "utf-8");

      const init = scillaJSONParams({
        _scilla_version: ["Uint32", 0],
        initial_contract_owner: ["ByStr20", address!],
        initial_base_uri: ["String", initialUri ? initialUri : ""],
        name: ["String", name],
        symbol: ["String", symbol],
      });

      const txParams = {
        version: version,
        amount: new BN(0),
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT
      }

      console.log("deploying contract...");

      const [tx, contract] = await zilliqa.contracts
        .new(contractCode, init)
        .deploy(txParams, 33, 1000, false)

      let receipt = tx.txParams.receipt
      if (receipt && receipt.exceptions) {
        let errorCause = getErrorCause(receipt.exceptions[0].message);
        throw new Error(errorCause);
      }

      console.log("successful deploy!");
      console.log("contract address =>", contract.address);

      res.status(200).json({
        success: receipt?.success,
        contractAddress: contract.address
      });

    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message, message: error.message });
    }
  } else {
    res.status(405).json({ error: "REQ_METHOD_NOT_ALLOWED" });
  }
}