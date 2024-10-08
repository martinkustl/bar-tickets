import { FC } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

const StyledItem = styled.li``;

// const StyledItemButton = styled(Button)`
//   width: 100%;
//   text-align: left;
//   color: ${({ theme }) => theme.colors.medium.hex};
//   border-radius: ${({ theme }) => theme.radius.normal};
//   padding: 0.8rem;
//   &:hover {
//     background-color: ${({ theme }) =>
//       `rgba(${theme.colors.primary.rgb}, 0.9)`};
//     color: ${({ theme }) => theme.colors.light.hex};
//   }
// `;

type PropsStyledItemLink = {
  isActive: boolean;
};

const StyledItemLink = styled.a<PropsStyledItemLink>`
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.light.hex : theme.colors.medium.hex};
  background-color: ${({ theme, isActive }) =>
    isActive && `rgba(${theme.colors.primary.rgb}, 0.9)`};
  border-radius: ${({ theme }) => theme.radius.normal};
  padding: 0.8rem;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: ${({ theme }) =>
      `rgba(${theme.colors.primary.rgb}, 0.9)`};
    color: ${({ theme }) => theme.colors.light.hex};
  }
`;

type Props = {
  path: string;
  name: string;
};

export const Item: FC<Props> = ({ path, name }) => {
  const router = useRouter();

  return (
    <StyledItem>
      <Link href={`${path}`} passHref>
        <StyledItemLink isActive={router.pathname === `${path}`}>
          {name}
        </StyledItemLink>
      </Link>
    </StyledItem>
  );
};
