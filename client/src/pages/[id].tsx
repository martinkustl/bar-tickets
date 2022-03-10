import { ReactElement } from 'react';
import Link from 'next/link';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import useHttp from '@/hooks/http';
import { baseApiUrl } from '@/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Item, Ticket } from '@/types';
import { Button } from '@/components/UI/Buttons/Button';

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

const StyledRightSide = styled.div`
  flex: 1;
`;

const StyledBigList = styled.ul`
  list-style: none;
  border-bottom: 1px solid black;
`;

const StyledCategoryList = styled.ul`
  list-style: none;
  display: grid;
  //grid-template-columns: 1fr 1fr;
  grid-template-columns: 1fr;
  //grid-row-gap: 0.5rem;
  grid-template-rows: auto;
  border-top: 1px solid black;
  //border-left: 1px solid black;
  & > li {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }
  & > li:last-child {
    border-bottom: none;
  }

  //&:last-child > li:last-child {
  //  border-bottom: 1px solid black;
  //}
`;

const StyledCategoryHeading = styled.h2`
  background-color: ${({ theme }) => `rgba(${theme.colors.medium.rgb}, 0.2)`};
  padding: 0.5rem 1rem;
  text-align: center;
`;

const StyledItemButton = styled(Button)`
  display: flex;
  // border: 1px solid ${({ theme }) => theme.colors.dark.hex};
  width: 100%;
  // border-radius: ${({ theme }) => theme.radius.normal};
  min-height: 50px;
  //height: 80px;
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledItemName = styled.div`
  flex: 1;
  min-height: inherit;
`;

const StyledItemSize = styled.div`
  width: 70px;
  border-left: 1px solid black;
  min-height: inherit;
`;

const StyledItemPrice = styled.div`
  width: 70px;
  border-left: 1px solid black;
  min-height: inherit;
`;

type ItemWithCategory = Item & { category: { id: number; name: string } };

const TicketPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useHttp<Ticket & { items: Item[] }>(
    `${baseApiUrl}/tickets/${id}`
  );

  const { data: items } = useHttp<ItemWithCategory[]>(
    `${baseApiUrl}/items?includeCategory=true`
  );

  if (!data || !items) return <div>Načítám</div>;

  function groupBy<T>(
    array: Array<T>,
    // eslint-disable-next-line no-unused-vars
    property: (x: T) => string
  ): { [key: string]: Array<T> } {
    return array.reduce((memo: { [key: string]: Array<T> }, x: T) => {
      if (!memo[property(x)]) {
        // eslint-disable-next-line no-param-reassign
        memo[property(x)] = [];
      }
      memo[property(x)].push(x);
      return memo;
    }, {});
  }

  const itemsByCategory = groupBy(
    items,
    (items: ItemWithCategory) => items.category.name
  );

  const renderItems = () => (
    <StyledBigList>
      {Object.entries(itemsByCategory).map(([key, value]) => (
        <li key={key}>
          <StyledCategoryList>
            <li>
              <StyledCategoryHeading>{key}</StyledCategoryHeading>
            </li>
            {value.map((item) => (
              <li key={item.id}>
                <StyledItemButton>
                  <StyledItemName>{item.name}</StyledItemName>
                  <StyledItemSize>{item.size}</StyledItemSize>
                  <StyledItemPrice>{item.price} Kč</StyledItemPrice>
                </StyledItemButton>
              </li>
            ))}
          </StyledCategoryList>
        </li>
      ))}
    </StyledBigList>
  );

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
      <StyledRightSide>{renderItems()}</StyledRightSide>
    </StyledTicketPage>
  );
};

TicketPage.getLayout = (page: ReactElement) => (
  <TicketsLayout>{page}</TicketsLayout>
);
export default TicketPage;
