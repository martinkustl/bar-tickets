import {
  DeleteBtn,
  OnEditClick,
  TableBodyRows,
  TableHeaderColumns,
} from '@/components/Table/types';
import { FC } from 'react';
import { EditColumn } from '@/components/Table/EditColumn';
import { DeleteColumn } from '@/components/Table/DeleteColumn';
import { ColumnBase } from '@/components/Table/ColumnBase';
import styled from 'styled-components';

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
  onEditClick: OnEditClick;
};

export const Body: FC<Props> = ({ headers, rows, onEditClick, deleteBtn }) => {
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
            return (
              <EditColumn key={key} item={item} onEditClick={onEditClick} />
            );
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
