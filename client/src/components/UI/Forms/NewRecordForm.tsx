import { BaseSyntheticEvent, FC } from 'react';
import { FormSubmitButton } from '@/components/UI/Buttons/FormSubmitButton';
import styled from 'styled-components';

const StyledFormWrapper = styled.section`
  //margin-top: 3rem;
  margin-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNewCategoryForm = styled.form`
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
};

export const NewRecordForm: FC<Props> = ({
  children,
  headingText,
  submitText,
  onSubmit,
}) => (
  <StyledFormWrapper>
    <StyledHorizontalLine />
    <StyledNewCategoryForm onSubmit={onSubmit}>
      <StyledHeading>{headingText}</StyledHeading>
      {children}
      <FormSubmitButton>{submitText}</FormSubmitButton>
    </StyledNewCategoryForm>
  </StyledFormWrapper>
);
