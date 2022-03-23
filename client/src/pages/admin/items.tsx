import { FC } from 'react';
import Head from 'next/head';
import { Heading } from '@/components/Admin/Heading';
import { Table } from '@/components/UI/Table/Table';
import useHttp from '@/hooks/http';
import { EditBtn, Item } from '@/types';
import { EditItemForm } from '@/components/Admin/Items/EditItemForm';
import { NewItemForm } from '@/components/Admin/Items/NewItemForm';
import { addRecord, editRecord, deleteRecord } from '@/helpers/swr';
import { baseApiUrl } from '@/constants';

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

const Items: FC = () => {
  const { data, mutate } = useHttp<Item[]>(`${baseApiUrl}/items`);

  const deleteBtn = {
    url: `${baseApiUrl}/items`,
    mutateSwr: deleteRecord(mutate, data),
  };

  const editBtn: EditBtn = {
    url: `${baseApiUrl}/items`,
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
        url={`${baseApiUrl}/items`}
        mutateSwr={addRecord(mutate, data)}
      />
    </>
  );
};

export default Items;
