import { BaseSyntheticEvent, FC } from 'react';
import { SubmitButton } from '@/components/UI/Buttons/SubmitButton';
import styled from 'styled-components';
import { CancelButton } from '@/components/UI/Buttons/CancelButton';

const StyledFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNewRecordModalForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  min-width: 400px;
  & > * {
    margin-bottom: 0.8rem;
  }
`;

const StyledHeading = styled.h2`
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
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e?: BaseSyntheticEvent | undefined
  ) => Promise<void>;
  onCancelChanges: () => void;
  cancelText: string;
};

export const NewRecordModalForm: FC<Props> = ({
  children,
  headingText,
  submitText,
  onSubmit,
  onCancelChanges,
  cancelText,
}) => (
  <StyledFormWrapper>
    <StyledNewRecordModalForm onSubmit={onSubmit}>
      <StyledHeading>{headingText}</StyledHeading>
      {children}
      <StyledButtonsWrapper>
        <CancelButton onCancelChanges={onCancelChanges}>
          {cancelText}
        </CancelButton>
        <SubmitButton>{submitText}</SubmitButton>
      </StyledButtonsWrapper>
    </StyledNewRecordModalForm>
  </StyledFormWrapper>
);
