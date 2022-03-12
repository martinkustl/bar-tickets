import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { ItemSum, Ticket, TicketDetailData } from '@/types';
import { baseApiUrl } from '@/constants';
import useSimpleHttp from '@/hooks/simpleHttp';
import { useErrorToast } from '@/hooks/errorToast';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@/components/UI/Modal';
import { CancelButton } from '@/components/UI/Buttons/CancelButton';
import { SubmitButton } from '@/components/UI/Buttons/SubmitButton';

const StyledFooter = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.dark.hex};
`;

const StyledPriceSum = styled.strong`
  text-align: center;
  padding: 1rem;
  display: block;
  font-size: 1.1rem;
`;

const StyledPayTicket = styled(Button)`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  width: 100%;
`;

const StyledModal = styled(Modal)`
  padding: 1rem;
`;

const StyledModalFooter = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const StyledModalHeading = styled.h2`
  margin-bottom: 1rem;
`;

const requestIdentifiers = {
  deleteItemFromTicket: 'deleteItemFromTicket',
  payTicket: 'payTicket',
};

type Props = {
  id: number;
  data: TicketDetailData;
};

export const LeftSideFooter: FC<Props> = ({ id, data }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    sendRequest,
    error,
    isLoading,
    data: simpleData,
    reqIdentifer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSimpleHttp<Ticket>();

  useErrorToast(error);

  useEffect(() => {
    if (
      simpleData &&
      !isLoading &&
      !error &&
      reqIdentifer === requestIdentifiers.payTicket
    ) {
      router.push('/');
    }
  }, [router, error, isLoading, reqIdentifer, simpleData]);

  const countPriceSum = (items: ItemSum[]) =>
    items.reduce((sum, currItem) => sum + currItem.price * currItem.sum, 0);

  const handlePayClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPaymentClick = async () => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${id}?affectOrders=true`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.payTicket,
    });
    setIsModalOpen(false);
  };

  return (
    <StyledFooter>
      <StyledPriceSum>
        Celková útrata: {countPriceSum(data.items)} Kč
      </StyledPriceSum>
      <StyledPayTicket onClick={handlePayClick}>Zaplatit účet</StyledPayTicket>
      {isModalOpen && (
        <StyledModal>
          <StyledModalHeading>Potvrzení platby</StyledModalHeading>
          <p>
            Platba účtu v hodnotě:
            <strong>{countPriceSum(data.items)} Kč </strong>
          </p>
          <StyledModalFooter>
            <CancelButton onCancelChanges={() => setIsModalOpen(false)}>
              Vrátit se zpět
            </CancelButton>
            <SubmitButton onClick={handleConfirmPaymentClick}>
              Potvrdit platbu
            </SubmitButton>
          </StyledModalFooter>
        </StyledModal>
      )}
    </StyledFooter>
  );
};
