import Head from 'next/head';
import Layout from '@/components/Admin/Layout/Layout';
import { SideBar } from '@/components/Admin/SideBar/SideBar';

const Home = () => (
  <Layout>
    <Head>
      <title>Bar tickets</title>
    </Head>
    <SideBar />
  </Layout>
);

export default Home;
