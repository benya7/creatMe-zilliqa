import { isBech32 } from '@zilliqa-js/util/dist/validation';
import { fromBech32Address } from '@zilliqa-js/zilliqa';

export default function parseAddress(address: string) {
  
  let isB32 = isBech32(address);
  let addressParsed = address;
  if (isB32) {
    addressParsed = fromBech32Address(address).toLowerCase();
  }

  return addressParsed;

}