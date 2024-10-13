import { AxiosError } from 'axios';
import { IResError } from '../types/common';

export const getAxiosError = (error: AxiosError<IResError>) => {
  let errorMessage = 'Something went wrong';

  if (error.response?.data.error) {
    errorMessage = error.response.data.error;
  }

  return errorMessage;
};

export const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = extractFileNameFromUrl(url) || 'default_image';
  const mimeType = blob.type || getMimeTypeFromUrl(url);

  return new File([blob], filename, { type: mimeType });
};

export const extractFileNameFromUrl = (url: string): string | null => {
  const filename = url.split('/').pop()?.split('?')[0];
  return filename ? decodeURIComponent(filename) : null;
};

export const getMimeTypeFromUrl = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'application/octet-stream'; // Fallback for unknown types
  }
};
