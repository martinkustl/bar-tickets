import { FC } from 'react';
import { Heading } from '@/components/AdminDetail/Heading';
import { Table } from '@/components/UI/Table/Table';
import useHttp from '@/hooks/http';
import { EditBtn, TableBodyRow } from '@/types';
import { EditItemForm } from '@/components/AdminDetail/Items/EditItemForm';
import { NewItemForm } from '@/components/AdminDetail/Items/NewItemForm';

const headers = {
  name: {
    name: 'Název',
  },
  size: {
    name: 'Velikost',
  },
  price: {
    name: 'Cena',
  },
  edit: {
    name: 'Editace',
  },
  delete: {
    name: 'Mazání',
  },
};

type Item = {
  id: number;
  name: string;
  size: number;
  price: number;
};

const Items: FC = () => {
  const { data, mutate } = useHttp<Item[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/items`
  );

  const deleteBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/items`,
    mutateSwr: async (deletedRow: TableBodyRow) => {
      if (!data) return;
      const filteredData = data.filter((item) => item.id !== deletedRow.id);
      await mutate(filteredData, { revalidate: false });
    },
  };

  const editBtn: EditBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/items`,
    mutateSwr: async (updatedRow) => {
      if (!data) return;
      const updatedData = [...data].map((item) => {
        if (item.id === updatedRow.id) return updatedRow;
        return item;
      });

      await mutate([...(updatedData as Item[])], { revalidate: false });
    },
    renderEditForm: (item, url, mutateSwr, onModalChange) => (
      <EditItemForm
        url={url}
        mutateSwr={mutateSwr}
        // onUpdateRequest={handleUpdateRequest}
        onModalChange={onModalChange}
        item={item}
      />
    ),
  };

  return (
    <div>
      <Heading heading="Administrace položek" />
      <Table
        deleteBtn={deleteBtn}
        editBtn={editBtn}
        rows={data}
        headers={headers}
      />
      <NewItemForm
        url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/items`}
        mutateSwr={async (newCategory) => {
          if (!data) return;
          await mutate([...data, newCategory], false);
        }}
      />
    </div>
  );
};

export default Items;
