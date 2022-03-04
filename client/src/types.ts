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

export type OnCancelChanges = () => void;

// eslint-disable-next-line no-unused-vars
export type EditMutateSwr = (updatedRow: TableBodyRow) => Promise<void>;

export type EditBtn = {
  url: string;
  // eslint-disable-next-line no-unused-vars
};
