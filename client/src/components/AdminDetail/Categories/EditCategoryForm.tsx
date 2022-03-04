import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@/components/UI/FormInputs/Input';
import styled from 'styled-components';
import { Button } from '@/components/UI/Button';

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

const StyledSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.hex};
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
  onUpdateRequest: (data: any) => void;
};

const EditCategoryForm: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editCategorySchema),
    defaultValues: {
      name: 'Some name',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
        <StyledSubmitButton>Provést změny</StyledSubmitButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default EditCategoryForm;
