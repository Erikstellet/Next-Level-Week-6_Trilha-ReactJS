import { useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';
import { HeaderRoom } from '../components/HeaderRoom';
import { RoomTitle } from '../components/RoomTitle';
import { QuestionList } from '../components/QuestionList';

import "../styles/adminRoom.scss";
import { ThemeButton } from '../components/ThemeButton';

type RoomParams =
{
  id: string;
}

export function AdminRoom()
{
  const params = useParams<RoomParams>(); 
  const { title, questions } = useRoom(params.id);

  return (
  <div id="page-room">

    <HeaderRoom EndRoom id={params.id}/>
    <ThemeButton />
    
    <main className="main-room">
      <RoomTitle roomTitle={title} numQuestions={questions.length}/>      
      <QuestionList id={params.id} />
    </main>

  </div> 
  )
}