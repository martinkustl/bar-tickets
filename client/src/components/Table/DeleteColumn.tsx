import { DeleteBtn, TableBodyRow } from '@/components/Table/types';
import { FC, useEffect } from 'react';
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

export const DeleteColumn: FC<Props> = ({ item, deleteBtn }) => {
  const theme = useTheme();
  const { data, error, isLoading, reqIdentifer, sendRequest } =
    useSimpleHttp<TableBodyRow>();

  useEffect(() => {
    if (
      reqIdentifer === requestIdentifiers.deleteItem &&
      data &&
      !error &&
      !isLoading
    ) {
      deleteBtn.onDeleteResponse(data);
    }
  }, [data, error, isLoading, reqIdentifer, deleteBtn]);

  const handleDeleteClick = async (item: TableBodyRow) => {
    await sendRequest({
      url: `${deleteBtn.url}/${item.id}`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.deleteItem,
    });
  };

  return (
    <ColumnBase>
      <Button type="button" onClick={() => handleDeleteClick(item)}>
        <Trash width={20} height={20} color={theme.colors.danger.hex} />
      </Button>
    </ColumnBase>
  );
};
