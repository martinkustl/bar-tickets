import { ItemButton } from '@/components/TicketDetail/ItemButton';
import { ItemSum, ItemWithCategory, Ticket } from '@/types';
import styled from 'styled-components';
import { baseApiUrl } from '@/constants';
import useSimpleHttp from '@/hooks/simpleHttp';
import { FC } from 'react';
import { useErrorToast } from '@/hooks/errorToast';

const StyledList = styled.ul`
  list-style: none;
  border-top: 1px solid black;
  & > li {
    border-bottom: 1px solid black;
  }
`;

type DeletedItem = { id: number; itemId: number; ticketId: number };

const requestIdentifiers = {
  deleteItemFromTicket: 'deleteItemFromTicket',
};

type Props = {
  id: number;
  data: Ticket & { items: ItemSum[] };
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (deletedItem: DeletedItem) => Promise<void>;
};

export const OrderedItemsList: FC<Props> = ({ id, data, mutateSwr }) => {
  const {
    sendRequest,
    error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSimpleHttp<DeletedItem>();

  useErrorToast(error);

  const isItemSum = (item: ItemWithCategory | ItemSum): item is ItemSum =>
    'sum' in item;

  const handleItemClick = async (item: ItemSum) => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${id}/${item.id}`,
      method: 'DELETE',
      body: item,
      reqIdentifer: requestIdentifiers.deleteItemFromTicket,
      mutateSwr,
    });
  };

  return (
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
  );
};
