import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Input } from '@/components/UI/FormInputs/Input';
import { NewRecordModalForm } from '@/components/UI/Forms/NewRecordModalForm';
import useSimpleHttp from '@/hooks/simpleHttp';
import { useErrorToast } from '@/hooks/errorToast';

const newTicketSchema = yup.object({
  name: yup.string().required('Název lístku je vyžadováno!'),
});

type NewTicket = {
  id: number;
  isPaid: boolean;
  name: string;
  createdAt: Date;
};

const requestIdentifiers = {
  createTicket: 'createTicket',
};

type Props = {
  // eslint-disable-next-line no-unused-vars
  onIsNewTicketModalOpenChange: (state: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  mutateSwr: (newItem: NewTicket) => Promise<void>;
};

export const NewTicketForm: FC<Props> = ({
  onIsNewTicketModalOpenChange,
  mutateSwr,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newTicketSchema) });

  const { sendRequest, error } = useSimpleHttp<NewTicket>();

  const onSubmit = handleSubmit(async (data) => {
    // await sendRequest({
    //   url,
    //   method: 'PATCH',
    //   body: data,
    //   reqIdentifer: requestIdentifiers.updateItem,
    //   mutateSwr,
    // });

    await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/tickets`,
      method: 'POST',
      body: data,
      reqIdentifer: requestIdentifiers.createTicket,
      mutateSwr,
    });

    onIsNewTicketModalOpenChange(false);
  });

  useErrorToast(error);

  return (
    <NewRecordModalForm
      headingText="Tvorba nového lístku"
      submitText="Vytvořit lístek"
      onSubmit={onSubmit}
      onCancelChanges={() => onIsNewTicketModalOpenChange(false)}
      cancelText="Zrušit tvorbu"
    >
      <Input
        errors={errors}
        register={register}
        placeholder="Název lístku"
        name="name"
        label="Název lístku"
      />
    </NewRecordModalForm>
  );
};
