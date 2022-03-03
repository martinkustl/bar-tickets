import { OnEditClick, TableBodyRow } from '@/components/Table/types';
import { FC } from 'react';
import { ColumnBase } from '@/components/Table/ColumnBase';

type Props = {
  item: TableBodyRow;
  onEditClick: OnEditClick;
};

export const EditColumn: FC<Props> = ({ item, onEditClick }) => (
  <ColumnBase>
    <button type="button" onClick={() => onEditClick(item)}>
      e
    </button>
  </ColumnBase>
);
