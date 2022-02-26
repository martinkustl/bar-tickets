import { useRouter } from 'next/router';
import { FC } from 'react';

const AdminItem: FC = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

export default AdminItem;
