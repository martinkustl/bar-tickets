import { FC } from 'react';
import styled from 'styled-components';
import { Breakpoint } from '@/types';
import { breakpoint } from '@/constants';

type StyledModalBackdropProps = {
  breakpoint: Breakpoint;
};

const StyledModalBackdrop = styled.div<StyledModalBackdropProps>`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

type StyledModalProps = {
  breakpoint: Breakpoint;
};

const StyledModal = styled.section<StyledModalProps>`
  background-color: white;
  box-shadow: 0 0 8px 7px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1000;
  height: auto;
  width: auto;
  border-radius: ${({ theme }) => theme.radius.normal};
`;

type Props = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  closeOnBackDropClick?: () => void;
};

export const Modal: FC<Props> = ({
  className,
  children,
  closeOnBackDropClick,
}) => (
  <StyledModalBackdrop
    id="backdrop"
    breakpoint={breakpoint}
    onMouseDown={(e) => {
      const target: Element = e.target as HTMLDivElement;
      if (target.id !== 'backdrop') return;
      if (closeOnBackDropClick) closeOnBackDropClick();
    }}
  >
    <StyledModal className={className} breakpoint={breakpoint}>
      {children}
    </StyledModal>
  </StyledModalBackdrop>
);
