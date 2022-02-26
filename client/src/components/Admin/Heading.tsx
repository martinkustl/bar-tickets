import { FC } from 'react';

type Props = {
  heading: string;
};

export const Heading: FC<Props> = ({ heading }) => <h2>{heading}</h2>;
