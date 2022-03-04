import { FC, InputHTMLAttributes } from 'react';

import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type RequiredType = {
  isRequired: boolean;
};

const StyledLabel = styled.label<RequiredType>`
  align-self: flex-start;
  font-size: 0.9rem;
  &:after {
    content: ${({ isRequired }) => (isRequired ? `'*'` : `''`)};
    //color: var(--color-danger);
    color: ${({ theme }) => theme.colors.danger.hex};
  }
`;

type StyledInputType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};

const StyledInput = styled.input<StyledInputType>`
  flex: 1;
  outline: none;
  border: ${({ error, theme }) =>
    error ? `1px solid ${theme.colors.danger.hex}` : `1px solid black`};
  border-radius: ${({ theme }) => theme.radius.normal};
  /* padding: 0.8rem; */
  font-size: 1rem;
  padding: 0.5rem;

  &:focus {
    border: ${({ error, theme }) =>
      error ? `1px solid ${theme.colors.danger.hex};` : `1px solid black;`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.medium.hex};
  }
`;

const StyledErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger.hex};
  text-align: left;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  label?: string;
  placeholder: string;
  name: string;
  isActive?: boolean;
  maxLength?: number;
  max?: number | string;
  min?: number | string;
  className?: string;
  size?: number;
  showErrMessage?: boolean;
  required?: boolean;
}

export const Input: FC<Props> = ({
  label,
  placeholder,
  register,
  name,
  errors,
  isActive = true,
  maxLength,
  max,
  min,
  className,
  type = 'text',
  showErrMessage = true,
  required = false,
}) => {
  let errMessage = null;

  if (errors && errors[name] && errors[name].message) {
    errMessage = (
      <StyledErrorMessage>
        {errors[name] && errors[name].message}
      </StyledErrorMessage>
    );
  }

  let labelContent = null;

  if (label) {
    labelContent = <StyledLabel isRequired={required}>{label}</StyledLabel>;
  }

  return (
    <StyledInputWrapper className={className}>
      {labelContent}
      <StyledInput
        placeholder={placeholder}
        // name={name}
        // ref={register}
        {...register(name)}
        error={errors && errors[name]}
        disabled={!isActive}
        maxLength={maxLength}
        max={max}
        min={min}
        // defaultValue={defaultValue}
        type={type}
      />
      {showErrMessage && errMessage}
    </StyledInputWrapper>
  );
};
