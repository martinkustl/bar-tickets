import { useState } from 'react';
import useHttp from '@/hooks/http';
import { TicketItem } from '@/components/TicketsList/TicketItem';
import { Ticket } from '@/types';
import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { Modal } from '@/components/UI/Modal';
import { NewTicketForm } from '@/components/NewTicketForm/NewTicketForm';

const StyledHeading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledTicketsList = styled.ul`
  text-align: center;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 1rem;
  }
`;

const StyledNewTicket = styled(Button)`
  padding: 1rem;
  width: 400px;
  border-radius: ${({ theme }) => theme.radius.normal};
  background-color: ${({ theme }) => theme.colors.primary.hex};
  color: ${({ theme }) => theme.colors.light.hex};
`;

const StyledModal = styled(Modal)`
  padding: 1rem;
`;

export const TicketsList = () => {
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

  const { data, mutate } = useHttp<Ticket[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/tickets?isPaid=false`
  );

  let ticketsList;

  if (!data) {
    ticketsList = <p>Žádné položky k zobrazení</p>;
  } else {
    ticketsList = (
      <StyledTicketsList>
        <StyledNewTicket onClick={() => setIsNewTicketModalOpen(true)}>
          Vytvořit nový lístek
        </StyledNewTicket>
        {data.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </StyledTicketsList>
    );
  }

  return (
    <>
      <StyledHeading>Seznam lístků</StyledHeading>
      {ticketsList}
      {isNewTicketModalOpen && (
        <StyledModal>
          <NewTicketForm
            onIsNewTicketModalOpenChange={(state) =>
              setIsNewTicketModalOpen(state)
            }
          />
        </StyledModal>
      )}
    </>
  );
};
