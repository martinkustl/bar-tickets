import { Input } from '@/components/UI/FormInputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react';
import useSimpleHttp from '@/hooks/simpleHttp';
import { NewRecordForm } from '@/components/UI/Forms/NewRecordForm';
import { useErrorToast } from '@/hooks/errorToast';

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

export const NewCategoryForm: FC<Props> = ({ url, mutateSwr }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newCategorySchema),
  });

  const { sendRequest, error } = useSimpleHttp<NewCategory>();

  useErrorToast(error);

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
    <NewRecordForm
      headingText="Nová kategorie"
      submitText="Vytvořit kategorii"
      onSubmit={onSubmit}
    >
      <Input
        errors={errors}
        register={register}
        placeholder="Název kategorie"
        name="name"
        label="Název kategorie"
      />
    </NewRecordForm>
  );
};
