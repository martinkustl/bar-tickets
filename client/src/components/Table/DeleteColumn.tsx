import { OnDeleteClick, TableBodyRow } from '@/components/Table/types';
import { FC } from 'react';
import { ColumnBase } from '@/components/Table/ColumnBase';

type Props = {
  item: TableBodyRow;
  onDeleteClick: OnDeleteClick;
};

export const DeleteColumn: FC<Props> = ({ item, onDeleteClick }) => (
  <ColumnBase>
    <button type="button" onClick={() => onDeleteClick(item)}>
      d
    </button>
  </ColumnBase>
);
