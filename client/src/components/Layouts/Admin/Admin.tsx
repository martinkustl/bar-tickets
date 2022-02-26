import styled from 'styled-components';
import { FC } from 'react';
import { SideBar } from './SideBar/SideBar';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
  height: 100%;
  width: 100%;
`;

export const AdminLayout: FC = ({ children }) => (
  <StyledLayout>
    <SideBar />
    {children}
  </StyledLayout>
);
