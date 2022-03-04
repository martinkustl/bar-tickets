import styled from 'styled-components';
import { Input } from '@/components/UI/FormInputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react';
import useSimpleHttp from '@/hooks/simpleHttp';
import { FormSubmitButton } from '@/components/UI/Buttons/FormSubmitButton';

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
`;

const StyledHeading = styled.h3`
  margin-bottom: 1rem;
`;

const StyledHorizontalLine = styled.hr`
  width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  box-shadow: none;
`;

const newCategorySchema = yup.object({
  name: yup.string().required('Jméno kategorie je vyžadováno!'),
});

type FormData = yup.InferType<typeof newCategorySchema>;

type NewCategory = {
  id: number;
  name: string;
};

const requestIdentifiers = {
  createCategory: 'createCategory',
};

//  mutateSwr: (updatedRow: TableBodyRow) => Promise<void>;

type Props = {
  url: string;
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (newCategory: NewCategory) => Promise<void>;
};

const NewCategoryForm: FC<Props> = ({ url, mutateSwr }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newCategorySchema),
  });

  const { sendRequest } = useSimpleHttp<NewCategory>();

  const onSubmit = handleSubmit(async (data) => {
    // onCreateRequest(data);
    await sendRequest({
      url,
      method: 'POST',
      body: data,
      reqIdentifer: requestIdentifiers.createCategory,
      mutateSwr,
    });
  });

  return (
    <StyledFormWrapper>
      <StyledHorizontalLine />
      <StyledNewCategoryForm onSubmit={onSubmit}>
        <StyledHeading>Nová kategorie</StyledHeading>
        <Input
          errors={errors}
          register={register}
          placeholder="Název kategorie"
          name="name"
          label="Název kategorie"
        />
        <FormSubmitButton>Vytvořit kategorii</FormSubmitButton>
      </StyledNewCategoryForm>
    </StyledFormWrapper>
  );
};

export default NewCategoryForm;
