import { FC } from 'react';
import styled from 'styled-components';
import { Item } from './Item';

const StyledItems = styled.ul`
  list-style: none;
`;

const items = [
  {
    path: '/categories',
    name: 'Kategorie položek',
  },
  {
    path: '/items',
    name: 'Položky',
  },
  {
    path: '/tickets',
    name: 'Lístky',
  },
];

export const Items: FC = () => (
  <StyledItems>
    {items.map(({ path, name }) => (
      <Item key={path} path={path} name={name} />
    ))}
  </StyledItems>
);
