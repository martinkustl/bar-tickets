import { breakpoint } from '@/constants';

export interface IHttpError extends Error {
  statusCode: number;
  message: string;
}

export type Breakpoint = typeof breakpoint;

//    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
//     renderForm: (
//       onUpdateRequest: (data: any) => void,
//       onCancelChanges: () => void
//     ) => (
//       <EditCategoryForm
//         onUpdateRequest={onUpdateRequest}
//         onCancelChanges={onCancelChanges}
//       />
//     ),
