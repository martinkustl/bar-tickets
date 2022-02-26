import { useRouter } from 'next/router';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import useHttp from '@/hooks/http';
import { Heading } from '@/components/AdminDetail/Heading';

const AdminDetail: FC = () => {
  const { data, error } = useHttp<{ id: number; name: string }[]>(
    `http://localhost:3001/categories`
  );

  console.log(data);

  return (
    <div>
      <Heading heading="Administrace kategorií položek" />
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
