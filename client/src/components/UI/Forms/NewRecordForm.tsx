import { BaseSyntheticEvent, FC } from 'react';
import { SubmitButton } from '@/components/UI/Buttons/SubmitButton';
import styled from 'styled-components';

const StyledFormWrapper = styled.section`
  //margin-top: 3rem;
  //margin-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNewRecordForm = styled.form`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  min-width: 400px;
  & > * {
    margin-bottom: 0.8rem;
  }
`;

const StyledHeading = styled.h3`
  margin-bottom: 1rem;
`;

const StyledHorizontalLine = styled.hr`
  margin-top: 2rem;
  width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  box-shadow: none;
`;

type Props = {
  headingText: string;
  submitText: string;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e?: BaseSyntheticEvent | undefined
  ) => Promise<void>;
  isHorizontalLine?: boolean;
};

export const NewRecordForm: FC<Props> = ({
  children,
  headingText,
  submitText,
  onSubmit,
  isHorizontalLine = true,
}) => (
  <StyledFormWrapper>
    {isHorizontalLine && <StyledHorizontalLine />}
    <StyledNewRecordForm onSubmit={onSubmit}>
      <StyledHeading>{headingText}</StyledHeading>
      {children}
      <SubmitButton>{submitText}</SubmitButton>
    </StyledNewRecordForm>
  </StyledFormWrapper>
);
