import { FC } from 'react';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/Admin/Heading';
import { Table } from '@/components/UI/Table/Table';
import { EditBtn, TableBodyRow } from '@/types';
import { NewCategoryForm } from '@/components/Admin/Categories/NewCategoryForm';
import { EditCategoryForm } from '@/components/Admin/Categories/EditCategoryForm';

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
    mutateSwr: async (deletedRow: TableBodyRow) => {
      if (!data) return;
      const filteredData = data.filter((item) => item.id !== deletedRow.id);
      await mutate(filteredData, { revalidate: false });
    },
  };

  const editBtn: EditBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    mutateSwr: async (updatedRow) => {
      if (!data) return;
      const updatedData = [...data].map((item) => {
        if (item.id === updatedRow.id) return updatedRow;
        return item;
      });

      await mutate([...(updatedData as Category[])], { revalidate: false });
    },
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
    <div>
      <Heading heading="Administrace kategorií položek" />
      <Table
        deleteBtn={deleteBtn}
        editBtn={editBtn}
        rows={data}
        headers={headers}
      />
      <NewCategoryForm
        url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`}
        mutateSwr={async (newCategory) => {
          if (!data) return;
          await mutate([...data, newCategory], false);
        }}
      />
    </div>
  );
};

export default AdminDetail;
