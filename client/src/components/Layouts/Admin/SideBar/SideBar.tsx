import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Items } from './Items';

const StyledSideBar = styled.nav`
  border-right: 1px solid black;
  height: 100%;
  padding: 1rem;
`;

const StyledHeading = styled.h1`
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledTicketsLink = styled.a`
  margin-top: 10rem;
  font-weight: bold;
  display: block;
  color: ${({ theme }) => theme.colors.primary.hex};
  padding: 0.8rem;
`;

export const SideBar: FC = () => (
  <StyledSideBar>
    <StyledHeading>Admin Panel</StyledHeading>
    <Items />
    <Link href="/" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledTicketsLink>Přejít na lístky</StyledTicketsLink>
    </Link>
  </StyledSideBar>
);
