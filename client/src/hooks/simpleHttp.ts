import { useReducer, useCallback, Reducer } from 'react';
import { IHttpError } from '@/types';

const initialState = {
  loading: false,
  error: undefined,
  data: undefined,
  identifier: undefined,
};

type Action<T> =
  | { type: 'send'; identifier: string }
  | { type: 'response'; resData: T }
  | { type: 'error'; message: string; statusCode: number }
  | { type: 'clear' };

type SimpleHttpState<T> = {
  loading: boolean;
  error?: IHttpError;
  data?: T;
  identifier?: string;
};

const httpReducer = <T>(
  httpState: SimpleHttpState<T>,
  action: Action<T>
): SimpleHttpState<T> => {
  switch (action.type) {
    case 'send':
      return {
        loading: true,
        error: undefined,
        data: undefined,
        identifier: action.identifier,
      };
    case 'response':
      return {
        ...httpState,
        loading: false,
        data: action.resData,
      };
    case 'error':
      return {
        ...httpState,
        loading: false,
        error: {
          name: 'http-err',
          message: action.message,
          statusCode: action.statusCode,
        },
      };
    case 'clear':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

type SendRequestParams<T> = {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  body: any;
  reqIdentifer: string;
  // eslint-disable-next-line no-unused-vars
  mutateSwr?: (data: T) => Promise<void>;
};

const useSimpleHttp = <ResData>() => {
  const [httpState, dispatchHttp] = useReducer<
    Reducer<SimpleHttpState<ResData>, Action<ResData>>
  >(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'clear' }), []);

  const sendRequest = useCallback(
    async ({
      url,
      method,
      body,
      reqIdentifer,
      mutateSwr,
    }: SendRequestParams<ResData>) => {
      dispatchHttp({ type: 'send', identifier: reqIdentifer });

      try {
        const res = await fetch(url, {
          method,
          body: JSON.stringify({ ...body }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonRes = await res.json();

        if (!res.ok) {
          throw jsonRes;
        }

        if (mutateSwr) {
          mutateSwr(jsonRes);
        }

        dispatchHttp({ type: 'response', resData: jsonRes });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err && err.message && err.statusCode) {
          dispatchHttp({
            type: 'error',
            message: err.message,
            statusCode: err.statusCode,
          });
        }
      }
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqIdentifer: httpState.identifier,
    clear,
  };
};

export default useSimpleHttp;
