export const ZRC6_ERROR: { [key: string]: number } = {
  NotPausedError: -1,
  PausedError: -2,
  SelfError: -3,
  NotContractOwnerError: -4,
  NotTokenOwnerError: -5,
  NotMinterError: -6,
  NotOwnerOrOperatorError: -7,
  MinterNotFoundError: -8,
  MinterFoundError: -9,
  SpenderFoundError: -10,
  OperatorNotFoundError: -11,
  OperatorFoundError: -12,
  NotAllowedToTransferError: -13,
  TokenNotFoundError: -14,
  InvalidFeeBPSError: -15,
  ZeroAddressDestinationError: -16,
  ThisAddressDestinationError: -17,
  NotContractOwnershipRecipientError: -18,
};

const getErrorMsg = (code: number) =>
  `Exception thrown: (Message [(_exception : (String "Error")) ; (code : (Int32 ${code}))])`;





export default function getErrorCause(error: string) {

  let errorCause = error;
  let errorKeys = Object.keys(ZRC6_ERROR);

  errorKeys.forEach(key => {
    let errorMsg = getErrorMsg(ZRC6_ERROR[key]);
    if (errorMsg == error) {
      errorCause = key
    }
  })
  return errorCause;
}