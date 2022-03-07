import Head from 'next/head';
import { ReactElement } from 'react';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import Link from 'next/link';

const Home = () => (
  <>
    <Head>
      <title>Bar tickets</title>
    </Head>
    <h1>Lístky</h1>
    <Link href="/admin/items" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>Přejít na administraci</a>
    </Link>
  </>
);

// Home.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
Home.getLayout = (page: ReactElement) => <TicketsLayout>{page}</TicketsLayout>;
export default Home;
