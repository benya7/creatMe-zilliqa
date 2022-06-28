import { NextApiRequest, NextApiResponse } from "next"
import initProvider from "./lib/init-provider";
import { scillaJSONParams } from "@zilliqa-js/scilla-json-utils";
import { BN } from "@zilliqa-js/util"
import getConfig, { GAS_LIMIT, GAS_PRICE, UPLOADS_DIR } from "./lib/get-config";
import getErrorCause from './lib/get-error-cause';
import { AdminRequest } from "../../lib/types";
import parseAddress from "./lib/parse-address";
import fs from "fs";
import path from "path";
interface Request extends NextApiRequest {
  body: AdminRequest
}

export default async function handler(req: Request, res: NextApiResponse) {

  if (req.method == "POST") {

    let {
      network,
      contractAddress,
      transition,
      options
    } = req.body;

    try {

      const zilliqa = await initProvider(network, true);
      const { version } = getConfig(network);
      const contractAddressParsed = parseAddress(contractAddress)
      const contract = zilliqa.contracts.at(contractAddressParsed);

      if (transition.params.to) {
        transition.params.to[1] = parseAddress(transition.params.to[1])
      }

      if (transition.name == 'BatchMint' && options?.batchMintWithFile) {
        let mintFile = fs.readFileSync(path.join(UPLOADS_DIR, 'batch-mint.json'), 'utf-8');
        let mintFileParse: {
          to: string;
          tokenURI: string;
        }[] = JSON.parse(mintFile)

        let batchMintItems: [string, string][] = [];

        if (!Array.isArray(mintFileParse)) {
          throw new Error("BATCH_MINT_FILE_INVALID");
        }
        mintFileParse.forEach(item => {
          let validFormat = ("to" in item) && ("tokenURI" in item);
          if (!validFormat) {
            throw new Error("ITEM_FORMAT_INVALID");
          }
          batchMintItems.push([item.to, item.tokenURI]);
        })

        transition.params.to_token_uri_pair_list = [
          "List (Pair (ByStr20) (String))",
          batchMintItems
        ]
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