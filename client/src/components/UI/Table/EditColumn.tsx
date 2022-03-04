import { EditBtn, TableBodyRow } from '@/types';
import { FC, useState } from 'react';
import { ColumnBase } from '@/components/UI/Table/ColumnBase';
import { useTheme } from 'styled-components';
import { Pencil } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Buttons/Button';
import { Modal } from '@/components/UI/Modal';
import useSimpleHttp from '@/hooks/simpleHttp';
import EditCategoryForm from '@/components/AdminDetail/Categories/EditCategoryForm';

type Props = {
  item: TableBodyRow;
  editBtn: EditBtn;
};

const requestIdentifiers = {
  updateItem: 'updateItem',
};

export const EditColumn: FC<Props> = ({ item, editBtn }) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendRequest } = useSimpleHttp<TableBodyRow>();

  const handleUpdateRequest = async (data: TableBodyRow) => {
    await sendRequest({
      url: `${editBtn.url}/${item.id}`,
      method: 'PATCH',
      body: data,
      reqIdentifer: requestIdentifiers.updateItem,
      mutateSwr: editBtn.mutateSwr,
    });
  };

  return (
    <ColumnBase>
      <Button type="button" onClick={() => setIsModalOpen(true)}>
        <Pencil width={20} height={20} color={theme.colors.blue.hex} />
      </Button>
      {isModalOpen && (
        <Modal>
          <EditCategoryForm
            onUpdateRequest={handleUpdateRequest}
            onCancelChanges={() => setIsModalOpen(false)}
            item={item}
          />
        </Modal>
      )}
    </ColumnBase>
  );
};
