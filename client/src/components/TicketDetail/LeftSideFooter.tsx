import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { ItemSum, Ticket } from '@/types';
import { baseApiUrl } from '@/constants';
import useSimpleHttp from '@/hooks/simpleHttp';
import { useErrorToast } from '@/hooks/errorToast';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

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

const requestIdentifiers = {
  deleteItemFromTicket: 'deleteItemFromTicket',
  payTicket: 'payTicket',
};

type Props = {
  id: number;
  data: Ticket & { items: ItemSum[] };
};

export const LeftSideFooter: FC<Props> = ({ id, data }) => {
  const router = useRouter();

  const {
    sendRequest,
    error,
    isLoading,
    data: simpleData,
    reqIdentifer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSimpleHttp<any>();

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

  const handlePayClick = async () => {
    await sendRequest({
      url: `${baseApiUrl}/tickets/${id}?affectOrders=true`,
      method: 'DELETE',
      body: null,
      reqIdentifer: requestIdentifiers.payTicket,
    });
  };

  return (
    <StyledFooter>
      <StyledPriceSum>
        Celková útrata: {countPriceSum(data.items)} Kč
      </StyledPriceSum>
      <StyledPayTicket onClick={handlePayClick}>Zaplatit účet</StyledPayTicket>
    </StyledFooter>
  );
};
