import styled from 'styled-components';

export const ButtonContainer = styled.div
` 
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .button
  {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 0 25px;
    margin-right: 10px;

    border-radius: 8px;
    border: 0;
    font-weight: 500;
    background: #835afd;
    color: #FFF;
    cursor: pointer;
    transition: filter 0.2s;

    img
    {
      margin-right: 8px;
    }

    &.outlined
    {
      background: #FFF;
      border: 1px solid #835AFD;
      color: #835AFD;
    }

    &:not(:disabled):hover
    {
      filter: brightness(0.9);
    }

    &:disabled
    {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`