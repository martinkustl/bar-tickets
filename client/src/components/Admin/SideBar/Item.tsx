import { FC } from 'react';
import styled from 'styled-components';

const StyledItem = styled.li``;

const StyledItemButton = styled.button``;

type Props = {
  id: number;
  name: string;
};

export const Item: FC<Props> = ({ id, name }) => (
  <StyledItem>
    <StyledItemButton>
      {id}
      {name}
    </StyledItemButton>
  </StyledItem>
);
