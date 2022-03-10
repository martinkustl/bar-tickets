import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { FC } from 'react';
import { ItemWithCategory } from '@/types';

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

type Props = {
  item: ItemWithCategory;
  // eslint-disable-next-line no-unused-vars
  onItemClick: (item: ItemWithCategory) => void;
};

export const ItemButton: FC<Props> = ({ item, onItemClick }) => (
  <li>
    <StyledItemButton onClick={() => onItemClick(item)}>
      <StyledItemName>{item.name}</StyledItemName>
      <StyledItemSize>{item.size}</StyledItemSize>
      <StyledItemPrice>{item.price} Kč</StyledItemPrice>
    </StyledItemButton>
  </li>
);
