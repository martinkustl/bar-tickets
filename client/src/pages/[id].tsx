import { ReactElement, useEffect } from 'react';
import Link from 'next/link';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import useHttp from '@/hooks/http';
import { baseApiUrl } from '@/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ItemSum, Ticket, Item, ItemWithCategory } from '@/types';
import ItemsList from '@/components/TicketDetail/ItemsList/ItemsList';
import { ItemButton } from '@/components/TicketDetail/ItemButton';
import useSimpleHttp from '@/hooks/simpleHttp';
import { Button } from '@/components/UI/Buttons/Button';
import { useErrorToast } from '@/hooks/errorToast';

const StyledTicketPage = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledHeading = styled.h1`
  text-align: center;
`;

const StyledLeftSide = styled.section`
  border-right: 1px solid ${({ theme }) => theme.colors.dark.hex};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledLeftHeader = styled.header`
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  align-items: center;
  justify-items: center;
  padding: 1rem;
`;

const StyledList = styled.ul`
  list-style: none;
  border-top: 1px solid black;
  & > li {
    border-bottom: 1px solid black;
  }
`;

const StyledFooter = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.dark.hex};
`;

const StyledPriceSum = styled.strong`
  text-align: center;
  padding: 1rem;
  display: block;
  font-size: 1.1rem;
`;

const StyledPayTicket = styled(Button)`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  width: 100%;
`;

type DeletedItem = { id: number; itemId: number; ticketId: number };

const requestIdentifiers = {
  deleteItemFromTicket: 'deleteItemFromTicket',
  payTicket: 'payTicket',
};

const TicketPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, mutate } = useHttp<Ticket & { items: ItemSum[] }>(
    `${baseApiUrl}/tickets/${id}`
  );
  const {
    sendRequest,
    error,
    isLoading,
    data: simpleData,
    reqIdentifer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSimpleHttp<any>();

  useErrorToast(error);

  useEffect(() => {
    if (
      simpleData &&
      !isLoading &&
      !error &&
      reqIdentifer === requestIdentifiers.payTicket
    ) {
      router.push('/');
    }
  }, [router, error, isLoading, reqIdentifer, simpleData]);

  if (!data) return <div>Načítám</div>;

  const countPriceSum = (items: ItemSum[]) =>
    items.reduce((sum, currItem) => sum + currItem.price * currItem.sum, 0);

  const findExistingItem = (
    items: ItemSum[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newItem: { id: number; [key: string]: any }
  ) => items.find((existingItem) => existingItem.id === newItem.id);

  const handleItemClick = async (item: ItemSum) => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${id}/${item.id}`,
      method: 'DELETE',
      body: item,
      reqIdentifer: requestIdentifiers.deleteItemFromTicket,
      mutateSwr: async (deletedItem: DeletedItem) => {
        if (!data) return;
        const existingItem = findExistingItem(data.items, {
          id: deletedItem.itemId,
        });
        if (!existingItem) return;

        let filteredItems;
        if (existingItem.sum === 1) {
          filteredItems = data.items.filter(
            (currItem) => currItem.id !== deletedItem.itemId
          );
        } else {
          filteredItems = data.items.map((currItem) => {
            if (currItem.id === deletedItem.itemId) {
              return { ...currItem, sum: currItem.sum - 1 };
            }
            return currItem;
          });
        }
        await mutate(
          {
            ...data,
            items: [...filteredItems],
          },
          { revalidate: false }
        );
      },
    });
  };

  const handlePayClick = async () => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${id}?affectOrders=true`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.payTicket,
    });
  };

  const updateTicketItems = (items: ItemSum[], newItem: Item): ItemSum[] => {
    if (findExistingItem(items, newItem)) {
      return items.map((currItem) => {
        if (currItem.id === newItem.id) {
          return { ...currItem, sum: currItem.sum + 1 };
        }
        return currItem;
      });
    }
    return [
      ...items,
      {
        sum: 1,
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        size: newItem.size,
      },
    ];
  };

  const isItemSum = (item: ItemWithCategory | ItemSum): item is ItemSum =>
    'sum' in item;

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
        <StyledList>
          {data.items.map((item) => (
            <ItemButton
              key={item.id}
              item={item}
              onItemClick={(item) => {
                // eslint-disable-next-line no-unused-expressions
                isItemSum(item) && handleItemClick(item as ItemSum);
              }}
            />
          ))}
        </StyledList>
        <StyledFooter>
          <StyledPriceSum>
            Celková útrata: {countPriceSum(data.items)} Kč
          </StyledPriceSum>
          <StyledPayTicket onClick={handlePayClick}>
            Zaplatit účet
          </StyledPayTicket>
        </StyledFooter>
      </StyledLeftSide>
      {id && (
        <ItemsList
          ticketId={parseInt(id as string, 10)}
          mutateTicketItemsList={async (item: Item) => {
            if (!data) return;
            await mutate(
              {
                ...data,
                items: [...updateTicketItems(data.items, item)],
              },
              { revalidate: false }
            );
          }}
        />
      )}
    </StyledTicketPage>
  );
};

TicketPage.getLayout = (page: ReactElement) => (
  <TicketsLayout>{page}</TicketsLayout>
);
export default TicketPage;
