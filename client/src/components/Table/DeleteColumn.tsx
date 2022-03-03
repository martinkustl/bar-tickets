import { OnDeleteClick, TableBodyRow } from '@/components/Table/types';
import { FC } from 'react';
import { ColumnBase } from '@/components/Table/ColumnBase';
import { Trash } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Button';
import { useTheme } from 'styled-components';

type Props = {
  item: TableBodyRow;
  onDeleteClick: OnDeleteClick;
};

export const DeleteColumn: FC<Props> = ({ item, onDeleteClick }) => {
  const theme = useTheme();

  return (
    <ColumnBase>
      <Button type="button" onClick={() => onDeleteClick(item)}>
        <Trash width={20} height={20} color={theme.colors.danger.hex} />
      </Button>
    </ColumnBase>
  );
};
