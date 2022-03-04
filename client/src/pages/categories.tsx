import { FC } from 'react';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/AdminDetail/Heading';
import { Table } from '@/components/UI/Table/Table';
import { TableBodyRow } from '@/types';
import NewCategoryForm from '@/components/AdminDetail/Categories/NewCategoryForm';

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

  const editBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    mutateSwr: async (updatedRow: TableBodyRow) => {
      if (!data) return;
      const updatedData = [...data].map((item) => {
        if (item.id === updatedRow.id) return updatedRow;
        return item;
      });

      await mutate([...(updatedData as Category[])], { revalidate: false });
    },
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;
//   const res = await fetch(`http://localhost:3001/categories/${id}`);
//   const category = await res.json();
//   return {
//     props: { category },
//   };
// };

export default AdminDetail;
