# Usage

## Create a Token ZIP-6

Create a new NFT Token. Following the ZIP-6 standard.

Select the network in which you want to implement the contract and fill in the parameters.

The required parameters are Name and Symbol, the Initial URI parameter can be empty, it can be modified later in Manage.

[Read more about ZIP-6 Token Interface.](https://github.com/Zilliqa/ZRC/blob/main/zrcs/zrc-6.md)


##  Manage your Token

Manage your ZIP-6 token through a web form.

Enter the address of the contract, you must be the owner. Select the network on which it was deployed.And finally select the type of Transition.

If it requires parameters, fill them in. Then press the Submit button and wait for confirmation.

### Batch Mint with file

Note: The batch mint file, its mandatory name must be 'batch-mint.json'. Data format should be a collection of items with 'to' and 'tokenURI' fields. 
[See an example file here.](https://github.com/en0c-026/creatMe-zilliqa/blob/master/public/batch-mint-example.json)