import { FC } from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2`
  margin-bottom: 1rem;
`;

type Props = {
  heading: string;
};

export const Heading: FC<Props> = ({ heading }) => (
  <StyledHeading>{heading}</StyledHeading>
);
