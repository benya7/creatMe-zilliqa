import { FormEvent } from "react";
import { Network } from "../lib/types";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  name: string;
  setName: (value: string) => void
  symbol: string;
  setSymbol: (value: string) => void;
  network: Network;
  setNetwork: (value: Network) => void;
  initialUri: string;
  setInitialUri: (value: string) => void;
}

export default function NewTokenForm({
  handleOnSubmit,
  name,
  setName,
  symbol,
  setSymbol,
  network,
  setNetwork,
  initialUri,
  setInitialUri
}: FormProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 py-6">
          <div className="border-b">
            <span className="text-lg text text-gray-900 ml-4">Token Initial Parameters</span>
          </div>
          <label className="block" htmlFor="name">
            <span className="text-gray-700">Token Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="symbol">
            <span className="text-gray-700">Token Symbol</span>
            <textarea
              id="symbol"
              name="symbol"
              value={symbol}
              required
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            ></textarea>
          </label>
          <label className="block" htmlFor="initialUri">
            <span className="text-gray-700">Initial URI</span>
            <input
              type="text"
              id="initialUri"
              name="initialUri"
              value={initialUri}
              onChange={(e) => setInitialUri(e.target.value)}
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
              onChange={(e) => setNetwork((e.target.value) as Network)}
              value={network}
            >
              <option value="testnet">Testnet</option>
              <option value="mainnet">Mainnet</option>
            </select>
          </label>
          <button 
          className="mt-2 px-4 py-2 border bg-emerald-300 rounded-xl hover:bg-emerald-500 disabled:bg-gray-300" 
          type="submit"
          disabled={name === "" || symbol === ""}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}