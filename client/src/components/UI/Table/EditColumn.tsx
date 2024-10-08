import { EditBtn, TableBodyRow } from '@/types';
import { FC, useState } from 'react';
import { ColumnBase } from '@/components/UI/Table/ColumnBase';
import { useTheme } from 'styled-components';
import { Pencil } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Buttons/Button';
import { Modal } from '@/components/UI/Modal';

type Props = {
  item: TableBodyRow;
  editBtn: EditBtn;
};

export const EditColumn: FC<Props> = ({ item, editBtn }) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = (newState: boolean) => setIsModalOpen(newState);

  return (
    <ColumnBase>
      <Button type="button" onClick={() => setIsModalOpen(true)}>
        <Pencil width={20} height={20} color={theme.colors.blue.hex} />
      </Button>
      {isModalOpen && (
        <Modal>
          {editBtn.renderEditForm(
            item,
            `${editBtn.url}/${item.id}`,
            editBtn.mutateSwr,
            handleModalChange
          )}
        </Modal>
      )}
    </ColumnBase>
  );
};
