import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { FC, memo } from 'react';
import { ItemSum, ItemWithCategory } from '@/types';

const StyledItemButton = styled(Button)`
  display: flex;
  width: 100%;
  min-height: 50px;
  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledItemName = styled.div`
  flex: 1;
  min-height: inherit;
  margin-right: auto;
  justify-content: flex-start;
  padding-left: 1rem;
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

const StyledItemOrderedSum = styled.div`
  width: 70px;
  border-left: 1px solid black;
  min-height: inherit;
`;

type Props = {
  item: ItemWithCategory | ItemSum;
  // eslint-disable-next-line no-unused-vars
  onItemClick: (item: ItemWithCategory | ItemSum) => void;
};

// eslint-disable-next-line react/display-name
export const ItemButton: FC<Props> = memo(({ item, onItemClick }) => {
  const isItemSum = (item: ItemWithCategory | ItemSum): item is ItemSum =>
    'sum' in item;

  return (
    <li>
      <StyledItemButton onClick={() => onItemClick(item)}>
        <StyledItemName>{item.name}</StyledItemName>
        <StyledItemSize>{item.size}</StyledItemSize>
        {!isItemSum(item) && <StyledItemPrice>{item.price} Kč</StyledItemPrice>}
        {isItemSum(item) && (
          <StyledItemOrderedSum>{item.sum}x</StyledItemOrderedSum>
        )}
      </StyledItemButton>
    </li>
  );
});
