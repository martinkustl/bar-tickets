import Layout from '@/components/Admin/Layout/Layout';
import SideBar from '@/components/Admin/SideBar/SideBar';
import Head from 'next/head';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Bar tickets</title>
      </Head>
      <SideBar />
    </Layout>
  );
};

export default Home;
