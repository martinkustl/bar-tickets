import { FC } from 'react';
import Head from 'next/head';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/Admin/Heading';
import { Table } from '@/components/UI/Table/Table';
import { EditBtn } from '@/types';
import { NewCategoryForm } from '@/components/Admin/Categories/NewCategoryForm';
import { EditCategoryForm } from '@/components/Admin/Categories/EditCategoryForm';
import { deleteRecord, editRecord, addRecord } from '@/helpers/swr';
import { baseApiUrl } from '@/constants';

type Category = {
  id: number;
  name: string;
};

const headers = {
  name: {
    name: 'Text',
  },
  edit: {
    name: 'Editace',
  },
  delete: {
    name: 'Mazání',
  },
};

const AdminDetail: FC = () => {
  const { data, mutate } = useHttp<Category[]>(`${baseApiUrl}/categories`);

  // TODO - handle errors

  const deleteBtn = {
    url: `${baseApiUrl}/categories`,
    mutateSwr: deleteRecord(mutate, data),
  };

  const editBtn: EditBtn = {
    url: `${baseApiUrl}/categories`,
    mutateSwr: editRecord(mutate, data),
    renderEditForm: (item, url, mutateSwr, onModalChange) => (
      <EditCategoryForm
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
        <title>Kategorie položek</title>
      </Head>
      <Heading heading="Administrace kategorií položek" />
      <Table
        deleteBtn={deleteBtn}
        editBtn={editBtn}
        rows={data}
        headers={headers}
      />
      <NewCategoryForm
        url={`${baseApiUrl}/categories`}
        mutateSwr={addRecord(mutate, data)}
      />
    </>
  );
};

export default AdminDetail;
