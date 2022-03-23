import Head from 'next/head';
import { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import { TicketsList } from '@/components/TicketsList/TicketsList';

const StyledAdminLink = styled.a`
  padding: 1rem;
  display: block;
`;

const Home = () => (
  <>
    <Head>
      <title>Bar tickets</title>
    </Head>
    <Link href="/admin/items" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledAdminLink>Přejít na administraci</StyledAdminLink>
    </Link>
    <TicketsList />
  </>
);

// Home.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
Home.getLayout = (page: ReactElement) => <TicketsLayout>{page}</TicketsLayout>;
export default Home;
