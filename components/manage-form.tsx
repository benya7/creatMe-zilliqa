import { FormEvent } from "react";
import { Network, Transition, TransitionName } from "../lib/types";
import { Options } from "../pages/manage";
import { Params } from "./params";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  contractAddress: string;
  setContractAddress: (value: string) => void
  transition?: Partial<Transition>;
  setTransition: (value?: Partial<Transition>) => void;
  network: Network;
  setNetwork: (value: Network) => void;
  options: Options;
  setOptions: (value: Options) => void;
}

export default function ManageForm({
  handleOnSubmit,
  contractAddress,
  setContractAddress,
  transition,
  setTransition,
  network,
  setNetwork,
  options,
  setOptions
}: FormProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 py-6">
          <div className="border-b">
            <span className="text-lg text text-gray-900 ml-4">Transition Options</span>
          </div>
          <label className="block" htmlFor="contractAddress">
            <span className="text-gray-700">Contract Address</span>
            <input
              type="text"
              id="contractAddress"
              name="contractAddress"
              value={contractAddress}
              required
              onChange={(e) => setContractAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>

          <label className="block" htmlFor="network">
            <span className="text-gray-700">Network</span>
            <select
              id="network"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e: any) => setNetwork(e.target.value)}
              value={network}
            >
              <option value="testnet">Testnet</option>
              <option value="mainnet">Mainnet</option>
            </select>
          </label>
          <label className="block" htmlFor="transitionName">
            <span className="text-gray-700">Transition</span>
            <select
              id="transitionName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={({ target: { value } }) => setTransition({ name: (value as TransitionName), params: {} })}
              value={transition?.name ? transition.name : "Select a Transition"}
            >
              <option>Select a Transition</option>
              <option value="Pause">Pause</option>
              <option value="Unpause">Unpause</option>
              <option value="SetRoyaltyRecipient">SetRoyaltyRecipient</option>
              <option value="SetRoyaltyFeeBPS">SetRoyaltyFeeBPS</option>
              <option value="SetBaseURI">SetBaseURI</option>
              <option value="AddMinter">AddMinter</option>
              <option value="RemoveMinter">RemoveMinter</option>
              <option value="Mint">Mint</option>
              <option value="BatchMint">BatchMint</option>
              <option value="SetContractOwnershipRecipient">SetContractOwnershipRecipient</option>
              <option value="AcceptContractOwnership">AcceptContractOwnership</option>

            </select>
          </label>

          {
            transition && (
              <Params 
              transition={transition} 
              setTransition={setTransition} 
              options={options}
              setOptions={setOptions}
              />
            )
          }

          <button
            className="mt-2 px-4 py-2 border bg-emerald-300 rounded-xl hover:bg-emerald-500 disabled:bg-gray-300"
            type="submit"
            disabled={contractAddress === "" || !contractAddress || !transition || !transition.name}
          >
            Submit
          </button>
          {
            transition &&
            transition.params &&
            transition.params.to_token_uri_pair_list &&
            transition.params.to_token_uri_pair_list[1].length > 0 && (
              <div className="grid grid-cols-1 mt-4 gap-2 ">
                <span className="text-gray-700">Destination List</span>
                <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                  {
                    transition.params.to_token_uri_pair_list[1].map((
                      item: string[],
                      i: number
                    ) => (
                      item && (

                        <li key={i} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                          <div className="flex gap-2 justify-between">
                            <span>To:</span>
                            <span className="text-xs">{item[0]}</span>
                          </div>
                          <div className="flex gap-2 justify-between">
                            <span>URI:</span>
                            <span className="text-xs">{item[1]}</span>
                          </div>
                        </li>
                      )

                    ))
                  }

                </ul>
              </div>
            )
          }
        </div>
      </div>
    </form>
  )
}
