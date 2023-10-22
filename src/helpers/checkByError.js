import HttpError from "./HttpError.js";

const CheckByError = (bool, status, message) => {
  if (bool) {
    throw HttpError(status, message);
  }
};

export default CheckByError;