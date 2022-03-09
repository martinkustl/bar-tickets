import { FC } from 'react';
import { EditMutateSwr, Ticket } from '@/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useSimpleHttp from '@/hooks/simpleHttp';
import { EditRecordForm } from '@/components/UI/Forms/EditRecordForm';
import { Input } from '@/components/UI/FormInputs/Input';
import { useErrorToast } from '@/hooks/errorToast';

const editTicketSchema = yup.object({
  name: yup.string().required('Název lístku je vyžadován!'),
});

type FormData = yup.InferType<typeof editTicketSchema>;

type Props = {
  // eslint-disable-next-line no-unused-vars
  onModalChange: (state: boolean) => void;
  mutateSwr: EditMutateSwr;
  ticket: Ticket;
};

const requestIdentifiers = {
  editTicket: 'editTicket',
};

export const EditTicketForm: FC<Props> = ({
  onModalChange,
  mutateSwr,
  ticket,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editTicketSchema),
    defaultValues: {
      ...ticket,
    },
  });

  const { sendRequest, error } = useSimpleHttp<Ticket>();

  useErrorToast(error);

  const onSubmit = handleSubmit(async (data) => {
    await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/tickets/${ticket.id}`,
      method: 'PATCH',
      body: data,
      reqIdentifer: requestIdentifiers.editTicket,
      mutateSwr,
    });
    onModalChange(false);
  });

  return (
    <EditRecordForm
      headingText="Editace lístku"
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
        label="Název lístku"
      />
    </EditRecordForm>
  );
};
