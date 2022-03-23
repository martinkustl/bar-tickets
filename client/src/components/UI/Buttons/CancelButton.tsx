import styled from 'styled-components';
import { FC } from 'react';
import { Button } from '@/components/UI/Buttons/Button';

const StyledCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.medium.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.radius.normal};
`;

type Props = {
  onCancelChanges: () => void;
};

export const CancelButton: FC<Props> = ({ onCancelChanges, children }) => (
  <StyledCancelButton type="button" onClick={onCancelChanges}>
    {children}
  </StyledCancelButton>
);
