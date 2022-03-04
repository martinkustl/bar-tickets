import { FC } from 'react';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/AdminDetail/Heading';
import { Table } from '@/components/Table/Table';
import { TableBodyRow } from '@/components/Table/types';

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
  const { data, error, mutate } = useHttp<Category[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`
  );

  // TODO - handle errors

  const handleEditClick = (column: TableBodyRow) => {
    console.log(column);
  };

  const deleteBtn = {
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    onDeleteResponse: async (column: TableBodyRow) => {
      if (!data) return;
      const filteredData = [...data].filter((item) => item.id !== column.id);
      await mutate([...filteredData], false);
    },
  };

  return (
    <div>
      <Heading heading="Administrace kategorií položek" />
      <Table
        onEditClick={handleEditClick}
        deleteBtn={deleteBtn}
        rows={data}
        headers={headers}
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
