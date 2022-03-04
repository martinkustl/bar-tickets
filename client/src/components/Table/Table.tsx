import { FC } from 'react';
import { Header } from '@/components/Table/Header';
import { Body } from '@/components/Table/Body';
import {
  DeleteBtn,
  OnEditClick,
  TableBodyRows,
  TableHeaderColumns,
} from '@/components/Table/types';
import styled from 'styled-components';

// const headers = {
//   text: {
//     name: 'Text',
//   },
//   phone: {
//     name: 'Telefon',
//   },
//   edit: {
//     name: 'Editace',
//   },
//   delete: {
//     name: 'Mazání',
//   },
// };
//
// const columns = [
//   {
//     id: 1,
//     text: 'some text',
//     phone: 124232,
//   },
//   {
//     id: 2,
//     text: 'some second text',
//     phone: 56643443,
//   },
//   {
//     id: 3,
//     text: 'some third text',
//     phone: 90890,
//   },
// ];

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

type Props = {
  onEditClick: OnEditClick;
  headers: TableHeaderColumns;
  deleteBtn: DeleteBtn;
  // eslint-disable-next-line react/require-default-props
  rows?: TableBodyRows;
};

export const Table: FC<Props> = ({
  onEditClick,
  deleteBtn,
  headers,
  rows = [],
}) => {
  let content = <p>No data to display</p>;

  if (rows?.length >= 0) {
    content = (
      <StyledTable cellSpacing={0}>
        <Header headers={headers} />
        <Body
          headers={headers}
          rows={rows}
          deleteBtn={deleteBtn}
          onEditClick={onEditClick}
        />
      </StyledTable>
    );
  }

  return <div>{content}</div>;
};
