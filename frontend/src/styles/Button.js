import styled from 'styled-components';

export const Button = styled('button')`
  border-radius: 30px;
  min-width: 140px;
  border: none;
  padding: 8px 12px 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.08) 0px 3px 6px 0px;
  background: white;
  font-size: 0.9rem;

  &:hover {
    transform: scale(1.05);
    transition: 0.1s ease-in;
    cursor: pointer;
  }
`