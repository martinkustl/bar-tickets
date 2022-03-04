import { ReactNode } from 'react';
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

export type TableHeaderColumn = {
  name: string;
};

export type TableHeaderColumns = { [key: string | number]: TableHeaderColumn };

type KeyType = keyof TableHeaderColumns;

// eslint-disable-next-line no-unused-vars
export type TableBodyRow = { [key in KeyType]: string | number };

export type TableBodyRows = TableBodyRow[];

export type DeleteBtn = {
  url: string;
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (deletedRow: TableBodyRow) => Promise<void>;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export type OnUpdateRequest = (data: any) => void;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export type OnCreateRequest = (data: any) => void;

export type OnCancelChanges = () => void;

export type EditBtn = {
  url: string;
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (updatedRow: TableBodyRow) => Promise<void>;
  renderForm: (
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    onUpdateRequest: OnUpdateRequest,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    onCancelChanges: OnCancelChanges,
    // eslint-disable-next-line no-unused-vars
    item: TableBodyRow
  ) => ReactNode;
};
