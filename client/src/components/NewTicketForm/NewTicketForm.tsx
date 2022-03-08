import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Input } from '@/components/UI/FormInputs/Input';
import { NewRecordModalForm } from '@/components/UI/Forms/NewRecordModalForm';

const newTicketSchema = yup.object({
  name: yup.string().required('Název lístku je vyžadováno!'),
});

type Props = {
  // eslint-disable-next-line no-unused-vars
  onIsNewTicketModalOpenChange: (state: boolean) => void;
};

export const NewTicketForm: FC<Props> = ({ onIsNewTicketModalOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newTicketSchema) });

  const onSubmit = handleSubmit(async (data) => {
    // await sendRequest({
    //   url,
    //   method: 'PATCH',
    //   body: data,
    //   reqIdentifer: requestIdentifiers.updateItem,
    //   mutateSwr,
    // });
    onIsNewTicketModalOpenChange(false);
  });

  // return (
  //   <StyledForm onSubmit={onSubmit}>
  //     <StyledHeading>Tvorba nového lístku</StyledHeading>
  //     <Input
  //       errors={errors}
  //       register={register}
  //       placeholder="Název lístku"
  //       name="name"
  //       label="Název lístku"
  //     />
  //   </StyledForm>
  // );
  // return (
  //   <NewRecordForm
  //     headingText="Tvorba nového lístku"
  //     submitText="Vytvořit lístek"
  //     onSubmit={onSubmit}
  //     isHorizontalLine={false}
  //   >
  //     <Input
  //       errors={errors}
  //       register={register}
  //       placeholder="Název lístku"
  //       name="name"
  //       label="Název lístku"
  //     />
  //   </NewRecordForm>
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
