export const MAX_UPLOAD_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_UPLOAD_FILE_SIZE_LABEL = "10 MB";

export const getFileTooLargeMessage = () =>
  `File is too large. Maximum upload size is ${MAX_UPLOAD_FILE_SIZE_LABEL}.`;
