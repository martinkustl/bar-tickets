import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { FormSubmitButton } from '@/components/UI/Buttons/FormSubmitButton';
import { BaseSyntheticEvent, FC } from 'react';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`;

const StyledHeading = styled.h3`
  margin-bottom: 1rem;
`;

const StyledButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const StyledCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.medium.hex};
  color: ${({ theme }) => theme.colors.light.hex};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.radius.normal};
`;

type Props = {
  headingText: string;
  submitText: string;
  cancelText: string;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e?: BaseSyntheticEvent | undefined
  ) => Promise<void>;
  onCancelChanges: () => void;
};

export const EditRecordForm: FC<Props> = ({
  headingText,
  submitText,
  cancelText,
  onSubmit,
  children,
  onCancelChanges,
}) => (
  <StyledFormWrapper>
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>{headingText}</StyledHeading>
      {children}
      <StyledButtonsWrapper>
        <StyledCancelButton type="button" onClick={onCancelChanges}>
          {cancelText}
        </StyledCancelButton>
        <FormSubmitButton>{submitText}</FormSubmitButton>
      </StyledButtonsWrapper>
    </StyledForm>
  </StyledFormWrapper>
);
