// Pastreaza confirmationResult intre PhonePage si SmsPage
let _confirmationResult = null;

export function setConfirmationResult(result) {
  _confirmationResult = result;
}

export function getConfirmationResult() {
  return _confirmationResult;
}
