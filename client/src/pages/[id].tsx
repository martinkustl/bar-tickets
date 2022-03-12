import { ReactElement } from 'react';
import Link from 'next/link';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';
import useHttp from '@/hooks/http';
import { baseApiUrl } from '@/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ItemSum, Ticket, Item } from '@/types';
import { ItemsList } from '@/components/TicketDetail/ItemsList/ItemsList';
import { OrderedItemsList } from '@/components/TicketDetail/OrderedItemsList/OrderedItemsList';
import { LeftSideFooter } from '@/components/TicketDetail/LeftSideFooter';

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

type DeletedItem = { id: number; itemId: number; ticketId: number };

const TicketPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, mutate } = useHttp<Ticket & { items: ItemSum[] }>(
    `${baseApiUrl}/tickets/${id}`
  );

  const findExistingItem = (
    items: ItemSum[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newItem: { id: number; [key: string]: any }
  ) => items.find((existingItem) => existingItem.id === newItem.id);

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleMutateTicketItemsList = async (item: Item) => {
    if (!data) return;
    await mutate(
      {
        ...data,
        items: [...updateTicketItems(data.items, item)],
      },
      { revalidate: false }
    );
  };

  if (!data) return <div>Načítám</div>;

  const handleItemDeleteMutate = async (deletedItem: DeletedItem) => {
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
  };

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
        <OrderedItemsList
          id={parseInt(id as string, 10)}
          data={data}
          mutateSwr={handleItemDeleteMutate}
        />
        <LeftSideFooter id={parseInt(id as string, 10)} data={data} />
      </StyledLeftSide>
      {id && (
        <ItemsList
          ticketId={parseInt(id as string, 10)}
          mutateTicketItemsList={handleMutateTicketItemsList}
        />
      )}
    </StyledTicketPage>
  );
};

TicketPage.getLayout = (page: ReactElement) => (
  <TicketsLayout>{page}</TicketsLayout>
);
export default TicketPage;
