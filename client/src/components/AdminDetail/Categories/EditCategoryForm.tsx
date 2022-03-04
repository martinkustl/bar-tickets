import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@/components/UI/FormInputs/Input';
import { EditMutateSwr, OnCancelChanges, TableBodyRow } from '@/types';
import useSimpleHttp from '@/hooks/simpleHttp';
import { EditRecordForm } from '@/components/UI/Forms/EditRecordForm';

const editCategorySchema = yup.object({
  name: yup.string().required('Jméno kategorie je vyžadováno!'),
});

type FormData = yup.InferType<typeof editCategorySchema>;

const requestIdentifiers = {
  updateItem: 'updateItem',
};

type Props = {
  url: string;
  mutateSwr: EditMutateSwr;
  // onUpdateRequest: OnUpdateRequest;
  onCancelChanges: OnCancelChanges;
  item: TableBodyRow;
};

const EditCategoryForm: FC<Props> = ({
  url,
  mutateSwr,
  onCancelChanges,
  // onUpdateRequest,
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

  const { sendRequest } = useSimpleHttp<TableBodyRow>();

  const onSubmit = handleSubmit(async (data) => {
    await sendRequest({
      url,
      method: 'PATCH',
      body: data,
      reqIdentifer: requestIdentifiers.updateItem,
      mutateSwr,
    });
  });

  return (
    <EditRecordForm
      headingText="Editace kategorie"
      submitText="Provést změny"
      cancelText="Zrušit změny"
      onSubmit={onSubmit}
      onCancelChanges={onCancelChanges}
    >
      <Input
        placeholder="text"
        register={register}
        name="name"
        errors={errors}
        label="Název categorie"
      />
    </EditRecordForm>
  );
};

export default EditCategoryForm;
