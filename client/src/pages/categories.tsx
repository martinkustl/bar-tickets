import { FC } from 'react';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/AdminDetail/Heading';
import { Table } from '@/components/Table/Table';
import { TableBodyRow } from '@/components/Table/types';

const AdminDetail: FC = () => {
  const { data, error } = useHttp<{ id: number; name: string }[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`
  );

  const handleDeleteClick = (column: TableBodyRow) => {
    console.log(column);
  };

  const handleEditClick = (column: TableBodyRow) => {
    console.log(column);
  };

  return (
    <div>
      <Heading heading="Administrace kategorií položek" />
      <Table onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
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
