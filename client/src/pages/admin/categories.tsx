import { FC } from 'react';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/Admin/Heading';
import { Table } from '@/components/UI/Table/Table';
import { EditBtn } from '@/types';
import { NewCategoryForm } from '@/components/Admin/Categories/NewCategoryForm';
import { EditCategoryForm } from '@/components/Admin/Categories/EditCategoryForm';
import Head from 'next/head';
import { deleteRecord, editRecord, addRecord } from '@/helpers/swr';

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
  const { data, mutate } = useHttp<Category[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`
  );

  // TODO - handle errors

  const deleteBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    mutateSwr: deleteRecord(mutate, data),
  };

  const editBtn: EditBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
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
        url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`}
        mutateSwr={addRecord(mutate, data)}
      />
    </>
  );
};

export default AdminDetail;
