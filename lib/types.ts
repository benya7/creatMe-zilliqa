export type TransitionName =
  "Pause" |
  "Unpause" |
  "SetRoyaltyRecipient" |
  "SetRoyaltyFeeBPS" |
  "SetBaseURI" |
  "Mint" |
  "BatchMint" |
  "Burn" |
  "BatchBurn" |
  "AddMinter" |
  "RemoveMinter" |
  "SetSpender" |
  "AddOperator" |
  "RemoveOperator" |
  "TransferFrom" |
  "BatchTransferFrom" |
  "SetContractOwnershipRecipient" |
  "AcceptContractOwnership"

export type Params = {
  [key: string]: [string, any];
}

export interface BaseRequest {
  network: "testnet" | "mainnet";
}

export type Transition = {
  name: TransitionName;
  params: Params;
}

export interface NewRequest extends BaseRequest {
  name: string;
  symbol: string;
  initialUri?: string;
  
}

export interface AdminRequest extends BaseRequest {
  contractAddress: string;
  transition: Transition;
  options?: {
    batchMintWithFile?: boolean
  }
}

export type Network = "testnet" | "mainnet"