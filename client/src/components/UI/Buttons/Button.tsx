import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--color-light);
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  /* transition: color 0.3s; */
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
  /* &:hover {
    background-color: none;
  } */
`;
