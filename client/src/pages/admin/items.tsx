import { FC } from 'react';
import { Heading } from '@/components/Admin/Heading';
import { Table } from '@/components/UI/Table/Table';
import useHttp from '@/hooks/http';
import { EditBtn } from '@/types';
import { EditItemForm } from '@/components/Admin/Items/EditItemForm';
import { NewItemForm } from '@/components/Admin/Items/NewItemForm';
import Head from 'next/head';
import { addRecord, editRecord, deleteRecord } from '@/helpers/swr';

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
    mutateSwr: deleteRecord(mutate, data),
  };

  const editBtn: EditBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/items`,
    mutateSwr: editRecord(mutate, data),
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
    <>
      <Head>
        <title>Položky</title>
      </Head>
      <Heading heading="Administrace položek" />
      <Table
        deleteBtn={deleteBtn}
        editBtn={editBtn}
        rows={data}
        headers={headers}
      />
      <NewItemForm
        url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/items`}
        mutateSwr={addRecord(mutate, data)}
      />
    </>
  );
};

export default Items;
