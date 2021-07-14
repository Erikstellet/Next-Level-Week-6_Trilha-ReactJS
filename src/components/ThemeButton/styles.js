import styled from 'styled-components';

export const ButtonContainer = styled.div
` 
  input
  {
    all: unset;
    position: absolute;
    display: inline-block;
    right: 110px;
    top: 10px;
    width: 80px;
    height: 30px;

    background: ${({theme}) => theme.violet};
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
  }

  input:checked
  {
    background-color:#fff;
  }

  input::after
  {
    content: "";
    position: absolute;
    box-sizing: border-box;
    height: 20px;
    width: 35px;
    top: 50%;
    left: 5px;
    z-index: 10;
    
    border-radius: 12px;
    background-color: white;
    transform: translateY(-50%) scale(1, 1);
    transition: left 350ms ease-in-out, transform 200ms ease-in-out;
  }

  input:checked::after
  {
    left: 50%;
    background: #5a189a;
  }

  input:active::after
  {
    transform: translateY(-50%) scale(1.15, 0.85);
  }

  .icons.moon
  {
    position: absolute;
    right: 165px;
    top:17px;
    transition: 350ms ease-in-out;
    color: #5a189a;
  }

  .icons.sun
  {
    position: absolute;
    right: 125px;
    top: 17px;
    color: white;
  }
`