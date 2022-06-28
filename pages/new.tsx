import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import { FormEvent, useEffect, useState } from "react";
import Error from "../components/error";
import Usage from "../components/usage";
//import CollectionForm from "../components/collection-form";
import useModal from "../hooks/useModal";
import Transaction from "../components/transaction";
import NewTokenForm from "../components/new-token-form";
//import handleItem from "../lib/handle-item-local";

export default function New() {

  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [initialUri, setInitialUri] = useState("");

  const {
    isVisible: isVisibleModalTransaction,
    showModal: showModalTransaction,
    hideModal: hideModalTransaction
  } = useModal();
  const {
    isVisible: isVisibleModalError,
    showModal: showModalError,
    hideModal: hideModalError
  } = useModal();

  const [error, setError] = useState<{ type: string; message: string }>();

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingTrasanction(true);
    showModalTransaction();

    const data = JSON.stringify({
      network: network,
      name: name,
      symbol: symbol,
      initialUri: initialUri
    });

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' }
    };

    try {
      const { data: response } = await axios.post('/api/new', data, config);

      console.log(response);
      setContractAddress(response.contractAddress)
      setLoadingTrasanction(false);

    } catch (e: any) {
      console.log(e)
      hideModalTransaction();
      setLoadingTrasanction(false);
      setError(e.response.data);
      showModalError();

      setTimeout(() => {
        setError(undefined)
      }, 40000);
    }

  }

  return (
    <Layout>
      <Head>
        <title>Create a New ZIP-6 Token (NFT) - creatMe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        {
          isVisibleModalError &&
          error &&
          (
            <Error
              hideModal={hideModalError}
              type={error.type}
              message={error.message}
            />
          )
        }
        {
          isVisibleModalTransaction && (
            <Transaction
              loadingTrasaction={loadingTransaction}
              hideModal={hideModalTransaction}
              message="The contract deployment was successful."
              hash={{ type: "contract", value: contractAddress }}
              action="Deploying NFT Token contract..."
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold pb-2 border-b border-gray-500">
                Create a New ZIP-6 Token (NFT)
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-4">
                <NewTokenForm
                  handleOnSubmit={handleOnSubmit}
                  name={name}
                  setName={setName}
                  network={network}
                  setNetwork={setNetwork}
                  symbol={symbol}
                  setSymbol={setSymbol}
                  initialUri={initialUri}
                  setInitialUri={setInitialUri}
                />
                <Usage
                  parrafos={[
                    { text: "Create a new NFT Token. Following the ZIP-6 standard." },
                  ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}