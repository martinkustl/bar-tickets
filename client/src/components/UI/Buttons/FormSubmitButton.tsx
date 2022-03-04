import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';

export const FormSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.radius.normal};
`;
