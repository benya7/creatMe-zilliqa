import { FormEvent } from "react";
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
              value={transition?.name}
            >
              <option selected value="Pause">Pause</option>
              <option value="Unpause">Unpause</option>
              <option value="SetRoyaltyRecipient">SetRoyaltyRecipient</option>
              <option value="SetRoyaltyFeeBPS">SetRoyaltyFeeBPS</option>
              <option value="SetBaseURI">SetBaseURI</option>
              <option value="AddMinter">AddMinter</option>
              <option value="RemoveMinter">RemoveMinter</option>
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
  }
  else {
    return null
  }
}