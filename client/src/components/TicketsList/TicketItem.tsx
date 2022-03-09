import { FC } from 'react';
import Link from 'next/link';
import { Ticket } from '@/types';
import styled from 'styled-components';
import { ArrowIosForwardOutline } from '@styled-icons/evaicons-outline';

const StyledTicketItem = styled.li`
  display: flex;
  width: 400px;
  & > * {
    margin-right: 1rem;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  padding: 1rem;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.medium.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  border-radius: ${({ theme }) => theme.radius.normal};
  //width: 400px;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => `rgba(${theme.colors.medium.rgb}, 0.9)`};
    transition: background-color 0.3s;
  }
`;

const StyledLinkText = styled.span`
  flex: 4;
  padding-left: 20px;
`;

type Props = {
  ticket: Ticket;
};

export const TicketItem: FC<Props> = ({ ticket, children }) => (
  <StyledTicketItem>
    <Link href={`/${ticket.id}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledLink>
        <StyledLinkText>{ticket.name}</StyledLinkText>
        <ArrowIosForwardOutline size={20} />
      </StyledLink>
    </Link>
    {children}
  </StyledTicketItem>
);
