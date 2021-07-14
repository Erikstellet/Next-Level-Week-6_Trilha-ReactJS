import { useContext } from 'react';
import copy from '../../assets/images/copy.svg';
import copyWhite from '../../assets/images/copy-white.svg';

import { ThemeContext } from '../../contexts/ThemeContext';
import { RoomCodeContainer } from './styles';

type RoomCodeProps = 
{
  code: string;
};

export function RoomCode(props: RoomCodeProps)
{  
  const { colors } = useContext(ThemeContext);

  function copyRoomCodeToClipBoard()
  { 
    navigator.clipboard.writeText(props.code);      
  }

  return (
  <RoomCodeContainer theme={colors}>
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
      {
        <img src={copyWhite} alt="Copy room code"/>
      }
      </div>
      <span>Sala {props.code}</span>
    </button>
  </RoomCodeContainer>
  )
}