import styled from 'styled-components';
import { FC } from 'react';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
  height: 100%;
  width: 100%;
`;

const Layout: FC = ({ children }) => <StyledLayout>{children}</StyledLayout>;

export default Layout;
