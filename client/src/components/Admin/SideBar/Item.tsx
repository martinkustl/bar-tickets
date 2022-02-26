import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/UI/Button';

const StyledItem = styled.li``;

const StyledItemButton = styled(Button)`
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.colors.medium.hex};
  border-radius: ${({ theme }) => theme.radius.normal};
  padding: 0.8rem;
  &:hover {
    background-color: ${({ theme }) =>
      `rgba(${theme.colors.primary.rgb}, 0.9)`};
    color: ${({ theme }) => theme.colors.light.hex};
  }
`;

type Props = {
  id: number;
  name: string;
};

export const Item: FC<Props> = ({ id, name }) => (
  <StyledItem>
    <StyledItemButton>{name}</StyledItemButton>
  </StyledItem>
);
