import { FC } from 'react';
import styled from 'styled-components';
import { Items } from './Items';

const StyledSideBar = styled.nav`
  border-right: 1px solid black;
  height: 100%;
  padding: 1rem;
`;

const StyledHeading = styled.h2`
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const SideBar: FC = () => (
  <StyledSideBar>
    <StyledHeading>Admin Panel</StyledHeading>
    <Items />
  </StyledSideBar>
);
