import { OnEditClick, TableBodyRow } from '@/components/Table/types';
import { FC } from 'react';
import { ColumnBase } from '@/components/Table/ColumnBase';
import { useTheme } from 'styled-components';
import { Pencil } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
// eslint-disable-next-line max-len
import EditCategoryForm from '@/components/AdminDetail/Categories/EditCategoryForm';

type Props = {
  item: TableBodyRow;
  onEditClick: OnEditClick;
};

export const EditColumn: FC<Props> = ({ item, onEditClick }) => {
  const theme = useTheme();

  return (
    <ColumnBase>
      <Button type="button" onClick={() => onEditClick(item)}>
        <Pencil width={20} height={20} color={theme.colors.blue.hex} />
      </Button>
      <Modal>
        <EditCategoryForm onUpdateRequest={(data) => console.log(data)} />
      </Modal>
    </ColumnBase>
  );
};
