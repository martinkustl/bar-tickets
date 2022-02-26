import useSWR, { SWRResponse, Key, SWRConfiguration } from 'swr';
import { useState, useEffect } from 'react';
import { IHttpError } from '@/types';
import { HttpError } from '../errors/http-error';

async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }

  try {
    return await res.json();
  } catch (err) {
    throw new Error('Fetched data are not in a valid json format!');
  }
}

const swrConfiguration: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useHttp<Data = any, Error = IHttpError>(
  initUrl: Key
): SWRResponse<Data, Error> {
  const [url, setUrl] = useState(initUrl);

  useEffect(() => {
    setUrl(initUrl);
  }, [initUrl]);

  const { ...SWRProps } = useSWR<Data, Error>(url, swrConfiguration);

  return {
    ...SWRProps,
  };
}

export default useHttp;
