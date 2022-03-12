import styled from 'styled-components';
import { SubmitButton } from '@/components/UI/Buttons/SubmitButton';
import { BaseSyntheticEvent, FC } from 'react';
import { CancelButton } from '@/components/UI/Buttons/CancelButton';

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
  & > * {
    margin-bottom: 0.8rem;
  }
`;

const StyledHeading = styled.h3`
  margin-bottom: 1rem;
`;

const StyledButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  margin-bottom: 0;
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
        <CancelButton onCancelChanges={onCancelChanges}>
          {cancelText}
        </CancelButton>
        <SubmitButton>{submitText}</SubmitButton>
      </StyledButtonsWrapper>
    </StyledForm>
  </StyledFormWrapper>
);
