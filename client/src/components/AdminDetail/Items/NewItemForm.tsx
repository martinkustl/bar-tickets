import { Input } from '@/components/UI/FormInputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react';
import useSimpleHttp from '@/hooks/simpleHttp';
import { NewRecordForm } from '@/components/UI/Forms/NewRecordForm';
import { useErrorToast } from '@/hooks/errorToast';

const editItemSchema = yup.object({
  name: yup.string().required('Název položky je vyžadován!'),
  size: yup.number().required('Velikost položky je vyžadována!'),
  price: yup.number().required('Cena položky je vyžadována!'),
});

type FormData = yup.InferType<typeof editItemSchema>;

type NewItem = {
  id: number;
  name: string;
  size: number;
  price: number;
};

const requestIdentifiers = {
  createCategory: 'createCategory',
};

//  mutateSwr: (updatedRow: TableBodyRow) => Promise<void>;

type Props = {
  url: string;
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (newItem: NewItem) => Promise<void>;
};

export const NewItemForm: FC<Props> = ({ url, mutateSwr }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editItemSchema),
  });

  const { sendRequest, error } = useSimpleHttp<NewItem>();

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
      headingText="Nová položka"
      submitText="Vytvořit položku"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="text"
        register={register}
        name="name"
        errors={errors}
        label="Název položky"
      />
      <Input
        placeholder="Velikost (např. 0.4)"
        register={register}
        name="size"
        errors={errors}
        label="Velikost"
      />
      <Input
        placeholder="Cena (např. 30)"
        register={register}
        name="price"
        errors={errors}
        label="Cena"
      />
    </NewRecordForm>
  );
};
