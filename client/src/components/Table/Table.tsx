import { FC } from 'react';
import { Header } from '@/components/Table/Header';
import { Body } from '@/components/Table/Body';
import { OnDeleteClick, OnEditClick } from '@/components/Table/types';
import styled from 'styled-components';

const headers = {
  text: {
    name: 'Text',
  },
  phone: {
    name: 'Telefon',
  },
  edit: {
    name: 'Editace',
  },
  delete: {
    name: 'Mazání',
  },
};

const columns = [
  {
    id: 1,
    text: 'some text',
    phone: 124232,
  },
  {
    id: 2,
    text: 'some second text',
    phone: 56643443,
  },
  {
    id: 3,
    text: 'some third text',
    phone: 90890,
  },
];

const StyledTable = styled.table`
  // & tr:last-child td:first-child {
  //   border-bottom-left-radius: ${({ theme }) => theme.radius.normal};
  // }
  // & tr:last-child td:last-child {
  //   border-bottom-right-radius: ${({ theme }) => theme.radius.normal};
  // }
  border-radius: ${({ theme }) => theme.radius.normal};
  border: 1px solid black;
  width: 100%;
  & tr:last-child td:first-child {
    border-bottom-left-radius: ${({ theme }) => theme.radius.normal};
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: ${({ theme }) => theme.radius.normal};
  }

  & td,
  th {
    border-bottom: 1px solid ${({ theme }) => theme.colors.medium.hex};
  }

  & tr:last-child td {
    border-bottom: none;
  }
`;

// type HeaderItem = {
//   text: string;
// };

type Props = {
  onDeleteClick: OnDeleteClick;
  onEditClick: OnEditClick;
};

export const Table: FC<Props> = ({ onDeleteClick, onEditClick }) => (
  <div>
    <StyledTable cellSpacing={0}>
      <Header headers={headers} />
      <Body
        headers={headers}
        columns={columns}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </StyledTable>
  </div>
);
