import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '@/components/UI/FormInputs/Input';
import { EditMutateSwr, TableBodyRow } from '@/types';
import useSimpleHttp from '@/hooks/simpleHttp';
import { EditRecordForm } from '@/components/UI/Forms/EditRecordForm';
import { useErrorToast } from '@/hooks/errorToast';

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
  item: TableBodyRow;
  // eslint-disable-next-line no-unused-vars
  onModalChange: (newState: boolean) => void;
};

const EditCategoryForm: FC<Props> = ({
  url,
  mutateSwr,
  // onUpdateRequest,
  item,
  onModalChange,
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

  const { sendRequest, error } = useSimpleHttp<TableBodyRow>();

  useErrorToast(error);

  const onSubmit = handleSubmit(async (data) => {
    await sendRequest({
      url,
      method: 'PATCH',
      body: data,
      reqIdentifer: requestIdentifiers.updateItem,
      mutateSwr,
    });
    onModalChange(false);
  });

  return (
    <EditRecordForm
      headingText="Editace kategorie"
      submitText="Provést změny"
      cancelText="Zrušit změny"
      onSubmit={onSubmit}
      onCancelChanges={() => onModalChange(false)}
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
