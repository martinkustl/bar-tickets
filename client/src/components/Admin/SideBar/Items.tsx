import { FC } from 'react';
import styled from 'styled-components';
import { Item } from './Item';

const StyledItems = styled.ul`
  list-style: none;
`;

const items = [
  {
    id: 1,
    name: 'Kategorie položek',
  },
  {
    id: 2,
    name: 'Položky',
  },
  {
    id: 3,
    name: 'Lístky',
  },
];

export const Items: FC = () => (
  <StyledItems>
    {items.map(({ id, name }) => (
      <Item key={id} id={id} name={name} />
    ))}
  </StyledItems>
);
