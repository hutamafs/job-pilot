// lib/apiResponse.ts
const createResponse = ({
  success,
  message,
  data = null,
  error = null,
}: {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
}) => {
  return {
    success,
    message,
    data,
    error,
  };
};

export default createResponse;
