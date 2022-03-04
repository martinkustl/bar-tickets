import { DeleteBtn, TableBodyRow } from '@/components/Table/types';
import { FC } from 'react';
import { ColumnBase } from '@/components/Table/ColumnBase';
import { Trash } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Button';
import { useTheme } from 'styled-components';
import useSimpleHttp from '@/hooks/simpleHttp';

type Props = {
  item: TableBodyRow;
  deleteBtn: DeleteBtn;
};

const requestIdentifiers = {
  deleteItem: 'deleteItem',
};

// eslint-disable-next-line react/display-name
export const DeleteColumn: FC<Props> = ({ deleteBtn, item }) => {
  const theme = useTheme();
  const { sendRequest } = useSimpleHttp<TableBodyRow>();

  const handleDeleteClick = async () => {
    await sendRequest({
      url: `${deleteBtn.url}/${item.id}`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.deleteItem,
      mutateSwr: deleteBtn.mutateSwr,
    });
  };

  return (
    <ColumnBase>
      <Button type="button" onClick={handleDeleteClick}>
        <Trash width={20} height={20} color={theme.colors.danger.hex} />
      </Button>
    </ColumnBase>
  );
};
