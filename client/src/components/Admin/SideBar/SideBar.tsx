import { FC } from 'react';
import styled from 'styled-components';

const StyledSideBar = styled.nav`
  background-color: black;
  height: 100%;
`;

const SideBar: FC = () => {
  return <StyledSideBar></StyledSideBar>;
};

export default SideBar;
