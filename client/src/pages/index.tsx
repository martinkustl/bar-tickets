import Head from 'next/head';
import { ReactElement } from 'react';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import Link from 'next/link';
import { TicketsList } from '@/components/TicketsList/TicketsList';

const Home = () => (
  <>
    <Head>
      <title>Bar tickets</title>
    </Head>
    <Link href="/admin/items" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>Přejít na administraci</a>
    </Link>
    <TicketsList />
  </>
);

// Home.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
Home.getLayout = (page: ReactElement) => <TicketsLayout>{page}</TicketsLayout>;
export default Home;
