import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import { FormEvent, useCallback, useState } from "react";
import Error from "../components/error";
import Usage from "../components/usage";
import useModal from "../hooks/useModal";
import Transaction from "../components/transaction";
import { Network, Transition } from "../lib/types"
import ManageForm from "../components/manage-form";
import { Uploader } from "../components/uploader";

export type Options = {
  batchMintWithFile: boolean;
};

export default function Manage() {

  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [network, setNetwork] = useState<Network>();
  const [options, setOptions] = useState<Options>({
    batchMintWithFile: false
  });
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

  const onChangeUploader = useCallback(async (formData: FormData) => {

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    await axios.post('/api/upload', formData, config);
  }, []);


  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingTrasanction(true);
    showModalTransaction();

    const data = JSON.stringify({
      network: network,
      contractAddress: contractAddress,
      transition: transition,
      options: {
        batchMintWithFile: options.batchMintWithFile
      }
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
                  options={options}
                  setOptions={setOptions}
                />
                <div className="grid grid-cols-1 gap-2">
                  <Usage
                    parrafos={[
                      {text: "Manage your ZIP-6 token through a web form." },
                      {text: "Enter the address of the contract, you must be the owner. Select the network on which it was deployed.And finally select the type of Transition."},
                      {text: "If it requires parameters, fill them in. Then press the Submit button and wait for confirmation."}
                    ]}
                  >
                    {
                      options.batchMintWithFile && (
                        <div>
                          <p>
                            <span className="underline">Note:</span> The batch mint file, its mandatory name must be 'batch-mint.json'. Data format should be a collection of items with 'to' and 'tokenURI' fields.
                           {" "}
                           <a 
                           href="/batch-mint-example.json" 
                           target='_blank'
                           className="text-blue-700 hover:underline"
                           >
                             See an example file here.
                             </a>
                          </p>
                        </div>
                      )
                    }
                  </Usage>
                  {
                    options.batchMintWithFile && (
                      <Uploader
                        onChange={onChangeUploader}
                        label="Select File"
                        uploadFileName="theFiles"
                        allowMultipleFiles={false}
                        showCount={false}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}