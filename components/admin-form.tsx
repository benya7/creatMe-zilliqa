import { FormEvent, useState } from "react";
import { Network, Transition, TransitionName } from "../lib/types";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  contractAddress: string;
  setContractAddress: (value: string) => void
  transition?: Partial<Transition>;
  setTransition: (value?: Partial<Transition>) => void;
  network?: Network;
  setNetwork: (value?: Network) => void;
}

export default function AdminForm({
  handleOnSubmit,
  contractAddress,
  setContractAddress,
  transition,
  setTransition,
  network,
  setNetwork
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
              <Params transition={transition} setTransition={setTransition} />
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

const Params = ({
  transition,
  setTransition
}: {
  transition: Partial<Transition>;
  setTransition: (value: Partial<Transition>) => void;
}) => {
  if (transition.name === "SetRoyaltyRecipient") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="to">
          <span className="text-gray-700 text-sm">To</span>
          <input
            type="text"
            id="to"
            name="to"
            value={transition.params?.to ? transition.params.to[1] : ""}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                to: ["ByStr20", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "SetRoyaltyFeeBPS") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="fee_bps">
          <span className="text-gray-700 text-sm">Fee Bps</span>
          <input
            type="number"
            id="fee_bps"
            name="fee_bps"
            value={transition.params?.fee_bps ? transition.params.fee_bps[1] : 0}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                fee_bps: ["Uint128", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "SetBaseURI") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="uri">
          <span className="text-gray-700 text-sm">Base URI</span>
          <input
            type="text"
            id="uri"
            name="uri"
            value={transition.params?.uri ? transition.params.uri[1] : ""}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                uri: ["String", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "SetContractOwnershipRecipient") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="to">
          <span className="text-gray-700 text-sm">To</span>
          <input
            type="text"
            id="to"
            name="to"
            value={transition.params?.to ? transition.params.to[1] : ""}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                to: ["ByStr20", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "AddMinter") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="to">
          <span className="text-gray-700 text-sm">To</span>
          <input
            type="text"
            id="to"
            name="to"
            value={transition.params?.to ? transition.params.to[1] : ""}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                to: ["ByStr20", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "RemoveMinter") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="to">
          <span className="text-gray-700 text-sm">To</span>
          <input
            type="text"
            id="to"
            name="to"
            value={transition.params?.to ? transition.params.to[1] : ""}
            required
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                to: ["ByStr20", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>

      </div>
    )
  } else if (transition.name === "Mint") {
    return (
      <div>
        <span className="text-gray-700">Params:</span>
        <label className="block" htmlFor="to">
          <span className="text-gray-700 text-sm">To</span>
          <input
            type="text"
            id="to"
            name="to"
            required
            value={transition.params?.to ? transition.params.to[1] : ""}
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                ...transition.params,
                to: ["ByStr20", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
        <label className="block" htmlFor="token_uri">
          <span className="text-gray-700 text-sm">Token URI</span>
          <input
            type="text"
            id="token_uri"
            name="token_uri"
            required
            value={transition.params?.token_uri ? transition.params.token_uri[1] : ""}
            onChange={({ target: { value } }) => setTransition({
              ...transition,
              params: {
                ...transition.params,
                token_uri: ["String", value]
              }
            })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
    )
  } else if (transition.name === "BatchMint") {
    return (
      <BatchMint
        transition={transition}
        setTransition={setTransition}
      />
    )
  }
  else {
    return null
  }
}



const BatchMint = ({
  transition,
  setTransition
}: {
  transition: Partial<Transition>;
  setTransition: (value: Partial<Transition>) => void;
}) => {
  const [to, setTo] = useState<string>();
  const [tokenURI, setTokenURI] = useState<string>();

  const handleOnClickAddDest = () => {
    if (!to || to === "" || !tokenURI || tokenURI === "") return;
    setTransition({
      ...transition,
      params: {
        to_token_uri_pair_list: [
          "List (Pair (ByStr20) (String))",
          [
            ...transition.params?.to_token_uri_pair_list?.[1] ? transition.params.to_token_uri_pair_list[1] : [null, null],
            [to, tokenURI]
          ]
        ]
      }
    })
  }
  const clearListDest = () => {
    setTransition({
      ...transition,
      params: undefined
    })
  }


  return (
    <div className="grid grid-cols-1 gap-4" >

      <label className="block" htmlFor="to">
        <span className="text-gray-700">to</span>
        <input
          type="text"
          name="to"
          id="to"
          required
          value={to ? to : ""}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label className="block" htmlFor="tokenURI">
        <span className="text-gray-700">Token URI</span>
        <input
          type="text"
          min={0}
          name="tokenURI"
          id="tokenURI"
          required
          value={tokenURI ? tokenURI : ""}
          onChange={(e) => setTokenURI(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <div className="flex flex-1 gap-2 justify-around">
        <button
          className="px-2 py-1 rounded-lg text-sm bg-cyan-600 hover:bg-cyan-700 text-slate-50 disabled:bg-slate-500" onClick={handleOnClickAddDest}
          type='button'
          disabled={!to || to === "" || !tokenURI || tokenURI === ""}>
          Add Destination
        </button>
        <button className="px-2 py-1 rounded-lg text-sm bg-orange-600 hover:bg-orange-700 text-slate-50 disabled:bg-slate-500" onClick={clearListDest} type='button'>
          Clear List
        </button>
      </div>
    </div>
  )

}