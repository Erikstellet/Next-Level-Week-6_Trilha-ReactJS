import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

type RoomTitleTypes = 
{
  roomTitle: string;
  numQuestions: number;
}

export function RoomTitle({ roomTitle, numQuestions }: RoomTitleTypes)
{
  const { colors } = useContext(ThemeContext);

  return (
  <div className="room-title">  
    <h1>{roomTitle}</h1>
  
    <span>
      {numQuestions}
      {
        numQuestions > 1 ? ` perguntas` 
        : numQuestions <= 0 ? ` não há perguntas` 
        : ` pergunta`
      }
    </span>
  </div>
  )
}