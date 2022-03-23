import Select, { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC } from 'react';
import { Input } from '@/components/UI/FormInputs/Input';
import useSimpleHttp from '@/hooks/simpleHttp';
import { NewRecordForm } from '@/components/UI/Forms/NewRecordForm';
import { useErrorToast } from '@/hooks/errorToast';
import useHttp from '@/hooks/http';

const editItemSchema = yup.object({
  name: yup.string().required('Název položky je vyžadován!'),
  size: yup.number().required('Velikost položky je vyžadována!'),
  price: yup.number().required('Cena položky je vyžadována!'),
  category: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required(),
    })
    .required(),
});

type FormData = yup.InferType<typeof editItemSchema>;

type NewItem = {
  id: number;
  name: string;
  size: number;
  price: number;
};

type CategoryOption = {
  id?: number;
  name?: string;
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
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editItemSchema),
  });

  const { data } = useHttp<CategoryOption[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`
  );

  const { sendRequest, error } = useSimpleHttp<NewItem>();

  useErrorToast(error);

  const onSubmit = handleSubmit(async (data) => {
    // onCreateRequest(data);
    await sendRequest({
      url,
      method: 'POST',
      body: { ...data, categoryId: data.category.id },
      reqIdentifer: requestIdentifiers.createCategory,
      mutateSwr,
    });
  });

  if (!data) return <div>Loading</div>;

  const selectStyles: StylesConfig<CategoryOption> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? theme.colors.primary.hex
        : theme.colors.dark.hex,
      boxShadow: state.isFocused
        ? `0 0 0 1px ${theme.colors.primary.hex}`
        : 'none',
      '&:hover': {
        borderColor: theme.colors.primary.hex,
      },
      '&:focus': {
        border: `1px solid ${theme.colors.primary.hex}`,
        outlineColor: theme.colors.primary.hex,
      },
    }),
  };

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
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div>
            <span>Kategorie</span>
            <Select<CategoryOption>
              {...field}
              options={data}
              getOptionValue={(option) => `${option.id}`}
              getOptionLabel={(option) => option.name ?? 'Nic nezvoleno'}
              defaultValue={{ id: data[0].id, name: data[0].name }}
              styles={selectStyles}
            />
          </div>
        )}
      />
    </NewRecordForm>
  );
};
