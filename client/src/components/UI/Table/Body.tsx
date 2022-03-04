import {
  DeleteBtn,
  EditBtn,
  TableBodyRows,
  TableHeaderColumns,
} from '@/components/UI/Table/types';
import { FC } from 'react';
import { DeleteColumn } from '@/components/UI/Table/DeleteColumn';
import { ColumnBase } from '@/components/UI/Table/ColumnBase';
import styled from 'styled-components';
import { EditColumn } from '@/components/UI/Table/EditColumn';

const StyledTBody = styled.tbody`
  & tr:nth-child(even) {
    td {
      background-color: ${({ theme }) =>
        `rgba(${theme.colors.medium.rgb}, 0.2)`};
    }
  }
  & tr:nth-child(odd) {
    td {
      background-color: ${({ theme }) => theme.colors.light.hex};
    }
  }
`;

type Props = {
  headers: TableHeaderColumns;
  rows: TableBodyRows;
  deleteBtn: DeleteBtn;
  editBtn: EditBtn;
};

// eslint-disable-next-line react/display-name
export const Body: FC<Props> = ({ headers, rows, deleteBtn, editBtn }) => {
  const bodyContent = rows.map((item, index) => (
    <tr
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    >
      {Object.entries(headers).map(
        ([
          key,
          // , value
        ]) => {
          if (key === 'edit') {
            return <EditColumn key={key} item={item} editBtn={editBtn} />;
          }
          if (key === 'delete') {
            return <DeleteColumn key={key} item={item} deleteBtn={deleteBtn} />;
          }
          return (
            <ColumnBase key={key}>{item[key as keyof typeof item]}</ColumnBase>
          );
        }
      )}
    </tr>
  ));
  return <StyledTBody>{bodyContent}</StyledTBody>;
};
