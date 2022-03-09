import { FC, useState } from 'react';
import styled from 'styled-components';
import { Pencil } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Buttons/Button';
import { EditTicketForm } from '@/components/TicketsList/EditTicketForm';
import { EditMutateSwr, Ticket } from '@/types';
import { Modal } from '@/components/UI/Modal';

const StyledEditButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.normal};
`;

type Props = {
  ticket: Ticket;
  mutateSwr: EditMutateSwr;
};

export const EditTicketButton: FC<Props> = ({ ticket, mutateSwr }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledEditButton onClick={() => setIsModalOpen(true)}>
        <Pencil size={20} />
      </StyledEditButton>
      {isModalOpen && (
        <Modal>
          <EditTicketForm
            onModalChange={(state) => setIsModalOpen(state)}
            ticket={ticket}
            mutateSwr={mutateSwr}
          />
        </Modal>
      )}
    </>
  );
};
