import { ReactElement } from 'react';
import Link from 'next/link';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import useHttp from '@/hooks/http';
import { baseApiUrl } from '@/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Item, Ticket } from '@/types';
import ItemsList from '@/components/TicketDetail/ItemsList/ItemsList';

const StyledTicketPage = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledHeading = styled.h1`
  text-align: center;
`;

const StyledLeftSide = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.dark.hex};
  flex: 1;
`;

const StyledLeftHeader = styled.header`
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  align-items: center;
  justify-items: center;
  padding: 1rem;
`;

const TicketPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useHttp<Ticket & { items: Item[] }>(
    `${baseApiUrl}/tickets/${id}`
  );

  if (!data) return <div>Načítám</div>;

  return (
    <StyledTicketPage>
      <StyledLeftSide>
        <StyledLeftHeader>
          <Link href="/" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Zpět</a>
          </Link>
          <StyledHeading>{data.name}</StyledHeading>
        </StyledLeftHeader>
        <ul>
          {data.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </StyledLeftSide>
      <ItemsList />
    </StyledTicketPage>
  );
};

TicketPage.getLayout = (page: ReactElement) => (
  <TicketsLayout>{page}</TicketsLayout>
);
export default TicketPage;
