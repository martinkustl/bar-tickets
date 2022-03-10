import { FC } from 'react';
import styled from 'styled-components';

const StyledTicketsLayout = styled.main`
  height: 100%;
`;

export const TicketsLayout: FC = ({ children }) => (
  <StyledTicketsLayout>{children}</StyledTicketsLayout>
);
