import styled from 'styled-components';
import { Trash } from '@styled-icons/bootstrap';
import { Button } from '@/components/UI/Buttons/Button';
import { DeleteMutateSwr, Ticket } from '@/types';
import { FC } from 'react';
import useSimpleHttp from '@/hooks/simpleHttp';
import { useErrorToast } from '@/hooks/errorToast';

const StyledDeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.normal};
`;

const requestIdentifiers = {
  deleteTicket: 'deleteTicket',
};

type Props = {
  ticket: Ticket;
  mutateSwr: DeleteMutateSwr;
};

export const DeleteTicketButton: FC<Props> = ({ ticket, mutateSwr }) => {
  const { sendRequest, error } = useSimpleHttp<Ticket>();

  useErrorToast(error);

  const handleDeleteClick = async () => {
    await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/tickets/${ticket.id}`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.deleteTicket,
      mutateSwr,
    });
  };

  return (
    <StyledDeleteButton onClick={handleDeleteClick}>
      <Trash size={20} />
    </StyledDeleteButton>
  );
};
