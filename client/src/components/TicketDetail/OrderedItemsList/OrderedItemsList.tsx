import { ItemButton } from '@/components/TicketDetail/ItemButton';
import { ItemSum, TicketDetailData } from '@/types';
import styled from 'styled-components';
import { baseApiUrl } from '@/constants';
import useSimpleHttp from '@/hooks/simpleHttp';
import { FC } from 'react';
import { useErrorToast } from '@/hooks/errorToast';
import { isItemSum } from '@/helpers/typeGuards';

const StyledList = styled.ul`
  list-style: none;
  border-top: 1px solid black;
  & > li {
    border-bottom: 1px solid black;
  }
`;

const StyledListLegend = styled.li`
  display: flex;
  min-height: 50px;
  background-color: ${({ theme }) => `rgba(${theme.colors.medium.rgb}, 0.2)`};
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const StyledName = styled.div`
  flex: 1;
  justify-content: flex-start;
  padding-left: 1rem;
`;

const StyledAmount = styled.div`
  width: 70px;
  text-align: center;
  border-left: 1px solid ${({ theme }) => theme.colors.dark.hex};
`;

const StyledSize = styled.div`
  width: 70px;
  text-align: center;
  border-left: 1px solid ${({ theme }) => theme.colors.dark.hex};
`;

type DeletedItem = { id: number; itemId: number; ticketId: number };

const requestIdentifiers = {
  deleteItemFromTicket: 'deleteItemFromTicket',
};

type Props = {
  id: number;
  data: TicketDetailData;
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
      <StyledListLegend>
        <StyledName>Název položky</StyledName>
        <StyledSize>Velikost</StyledSize>
        <StyledAmount>Počet</StyledAmount>
      </StyledListLegend>
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
