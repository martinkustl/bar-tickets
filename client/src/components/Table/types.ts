export type TableHeaderColumn = {
  name: string;
};

export type TableHeaderColumns = { [key: string | number]: TableHeaderColumn };

type KeyType = keyof TableHeaderColumns;

// eslint-disable-next-line no-unused-vars
export type TableBodyRow = { [key in KeyType]: string | number };

export type TableBodyRows = TableBodyRow[];

// eslint-disable-next-line no-unused-vars
export type OnDeleteClick = (item: TableBodyRow) => void;

// eslint-disable-next-line no-unused-vars
export type OnEditClick = (item: TableBodyRow) => void;
