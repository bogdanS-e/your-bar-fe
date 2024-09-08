import { AxiosError } from 'axios';
import { IResError } from '../types/common';

const getAxiosError = (error: AxiosError<IResError>) => {
  let errorMessage = 'Something went wrong';

  if (error.response?.data.error) {
    errorMessage = error.response.data.error;
  }

  return errorMessage;
};

export default getAxiosError;
