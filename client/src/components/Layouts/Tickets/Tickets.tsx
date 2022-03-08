import { FC } from 'react';
import styled from 'styled-components';

const StyledTicketsLayout = styled.main`
  padding: 1rem;
`;

export const TicketsLayout: FC = ({ children }) => (
  <StyledTicketsLayout>{children}</StyledTicketsLayout>
);
