import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import { FormEvent, useState } from "react";
import Error from "../components/error";
import Usage from "../components/usage";
import useModal from "../hooks/useModal";
import Transaction from "../components/transaction";
import { Network, Transition } from "../lib/types"
import ManageForm from "../components/manage-form";

export default function New() {

  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [network, setNetwork] = useState<Network>();

  const [transition, setTransition] = useState<Partial<Transition>>();

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
      contractAddress: contractAddress,
      transition: transition,
    });

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' }
    };

    try {
      const { data: response } = await axios.post('/api/manage', data, config);

      console.log(response);
      //setContractAddress(response.contractAddress)
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
        <title>Manage Token Contract - creatMe</title>
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
              message="Transition executed successfully."
              action={`Call token contract to ${transition?.name}`}
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold pb-2 border-b border-gray-500">
                Manage your Token Contract
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-4">
                <ManageForm
                  handleOnSubmit={handleOnSubmit}
                  contractAddress={contractAddress}
                  setContractAddress={setContractAddress}
                  transition={transition}
                  setTransition={setTransition}
                  network={network}
                  setNetwork={setNetwork}
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