import styled from 'styled-components';
import { FC } from 'react';
import useHttp from '@/hooks/http';
import { baseApiUrl } from '@/constants';
import { Item, ItemWithCategory } from '@/types';
import { ItemButton } from '@/components/TicketDetail/ItemButton';
import useSimpleHttp from '@/hooks/simpleHttp';
import { useErrorToast } from '@/hooks/errorToast';

const StyledRightSide = styled.section`
  flex: 1;
  overflow-y: auto;
`;

const StyledBigList = styled.ul`
  list-style: none;
  border-bottom: 1px solid black;
`;

const StyledCategoryList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  border-top: 1px solid black;
  & > li {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  }
  & > li:last-child {
    border-bottom: none;
  }
`;

const StyledCategoryHeading = styled.h2`
  background-color: ${({ theme }) => `rgba(${theme.colors.medium.rgb}, 0.2)`};
  padding: 0.5rem 1rem;
  text-align: center;
`;

const requestIdentifiers = {
  addItemToTicket: 'addItemToTicket',
};

type Props = {
  ticketId: number;
  // eslint-disable-next-line no-unused-vars
  mutateTicketItemsList: (item: Item) => Promise<void>;
};

// eslint-disable-next-line react/display-name
export const ItemsList: FC<Props> = ({ ticketId, mutateTicketItemsList }) => {
  const { sendRequest, error } = useSimpleHttp<Item>();
  const { data: items } = useHttp<ItemWithCategory[]>(
    `${baseApiUrl}/items?includeCategory=true`
  );

  useErrorToast(error);

  const handleItemClick = async (item: ItemWithCategory) => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${ticketId}/${item.id}`,
      method: 'POST',
      body: item,
      reqIdentifer: requestIdentifiers.addItemToTicket,
      mutateSwr: mutateTicketItemsList,
    });
  };

  if (!items) return <div>Načítám</div>;

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

  return (
    <StyledRightSide>
      <StyledBigList>
        {Object.entries(itemsByCategory).map(([key, value]) => (
          <li key={key}>
            <StyledCategoryList>
              <li>
                <StyledCategoryHeading>{key}</StyledCategoryHeading>
              </li>
              {value.map((item) => (
                <ItemButton
                  key={item.id}
                  item={item}
                  onItemClick={() => handleItemClick(item)}
                />
              ))}
            </StyledCategoryList>
          </li>
        ))}
      </StyledBigList>
    </StyledRightSide>
  );
};
