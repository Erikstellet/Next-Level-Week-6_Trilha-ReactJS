import styled from 'styled-components';

export const RoomCodeContainer = styled.div
`
  display: flex;
  justify-content: flex-end;
  align-items: end;

  .room-code
  {
    display: flex;
    height: 50px;
    background: #FFF;
    border: 1px solid #835AFD;
    background-color: white;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;

    div
    {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center; 
      padding: 0 15px;
      border-right: 1px solid #835AFD;
    }

    span
    {
      display: block;
      align-self: center;
      width: auto;
      padding: 0 14px 0 10px;
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
      color: #835AFD;
    }
  }
`