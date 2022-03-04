import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { HttpError } from '@/errors/http-error';
// import { ICustomHttpError } from '@/globalTypes';

export const useErrorToast = (error?: HttpError): void => {
  // prevent duplicate, see - https://fkhadra.github.io/react-toastify/prevent-duplicate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toastId = useRef<any>(null);
  useEffect(() => {
    if (error && !toast.isActive(toastId.current)) {
      toastId.current = toast.error(
        `${error.message} - ${error.statusCode && error.statusCode}`,
        {
          // toastId: nanoid(),
          type: 'error',
        }
      );
    }
  }, [error]);
};
