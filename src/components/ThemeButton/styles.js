import styled from 'styled-components';
import colors from '../../styles/colorPalettes'
const { violet } = colors;

export const ButtonContainer = styled.div
` 
  input
  {
    all: unset;
    position: absolute;
    display: inline-block;
    right: 30px;
    top: 20px;
    width: 60px;
    height: 30px;

    background-color: ${violet};
    border-radius: 15px;
    border: 1px solid #ccc;
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
    width: 20px;
    top: 50%;
    left: 5px;
    z-index: 10;
    
    border-radius: 50%;
    background-color: white;
    transform: translateY(-50%) scale(1, 1);
    transition: left 350ms ease-in-out, transform 200ms ease-in-out;
  }

  input:checked::after
  {
    left: calc(100% - 25px);
    background-color: ${violet};
  }

  input:active::after
  {
    transform: translateY(-50%) scale(1.15, 0.85);
  }

  .icons
  {
    position: absolute;
    right: 30px;
    top: 20px;
  }

  .icons.sun
  {
    position: absolute;
    right: 37px;
    top: 28px;
  }

  .icons.moon
  {
    position: absolute;
    right: 67px;
    top: 28px;
    transition: 350ms ease-in-out
  }
`