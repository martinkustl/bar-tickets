import { TableHeaderColumn } from '@/components/UI/Table/types';
import styled from 'styled-components';

const StyledHeaderColumn = styled.th`
  padding: 0.5rem;
`;

type Props<T> = {
  headers: T;
};

export const Header = <T extends Record<string, TableHeaderColumn>>({
  headers,
}: Props<T>) => (
  <thead>
    <tr>
      {Object.entries(headers).map(([key, header]) => (
        <StyledHeaderColumn key={key}>{header.name}</StyledHeaderColumn>
      ))}
    </tr>
  </thead>
);
