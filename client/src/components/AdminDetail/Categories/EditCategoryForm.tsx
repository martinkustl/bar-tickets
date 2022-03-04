import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@/components/UI/FormInputs/Input';
import styled from 'styled-components';
import { Button } from '@/components/UI/Buttons/Button';
import { FormSubmitButton } from '@/components/UI/Buttons/FormSubmitButton';
import { OnCancelChanges, OnUpdateRequest, TableBodyRow } from '@/types';

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

const editCategorySchema = yup.object({
  name: yup.string().required('Jméno kategorie je vyžadováno!'),
});

type FormData = yup.InferType<typeof editCategorySchema>;

type Props = {
  onUpdateRequest: OnUpdateRequest;
  onCancelChanges: OnCancelChanges;
  item: TableBodyRow;
};

const EditCategoryForm: FC<Props> = ({
  onCancelChanges,
  onUpdateRequest,
  item,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editCategorySchema),
    defaultValues: {
      ...item,
    },
  });

  const onSubmit = handleSubmit((data) => {
    onUpdateRequest(data);
  });

  const handleCancelButtonClick = () => {
    onCancelChanges();
  };

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <StyledHeading>Editace kategorie</StyledHeading>
        <Input
          placeholder="text"
          register={register}
          name="name"
          errors={errors}
          label="Název categorie"
        />
        <StyledButtonsWrapper>
          <StyledCancelButton type="button" onClick={handleCancelButtonClick}>
            Zavřít
          </StyledCancelButton>
          <FormSubmitButton>Provést změny</FormSubmitButton>
        </StyledButtonsWrapper>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default EditCategoryForm;
