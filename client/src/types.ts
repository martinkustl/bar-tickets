import { breakpoint } from '@/constants';

export interface IHttpError extends Error {
  statusCode: number;
  message: string;
}

export type Breakpoint = typeof breakpoint;
