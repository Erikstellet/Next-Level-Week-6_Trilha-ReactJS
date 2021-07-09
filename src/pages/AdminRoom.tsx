import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { useRoom } from '../hooks/useRoom';
import { Question } from "../components/Question";

import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';
import "../styles/adminRoom.scss";
import { HeaderRoom } from '../components/HeaderRoom';
import { RoomTitle } from '../components/RoomTitle';

type RoomParams =
{
  id: string;
}

export function AdminRoom()
{
  const params = useParams<RoomParams>(); 
  const { title, questions } = useRoom(params.id);

  async function handleHighlightQuestion(questionId: string)
  {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update
    ({
      isHighlighted: true,
    });
  }

  async function handleAnsweredQuestion(questionId: string)
  {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update
    ({
      isAnswered: true,
    });
  }

  async function handleDeleteQuestion(questionId: string)
  {
    if(window.confirm('Você tem certeza que deseja excluir essa pergunta?'))
    {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  return (
  <div id="page-room">

    <HeaderRoom EndRoom id={params.id}/>

    <main className="main-room">

      <RoomTitle roomTitle={title} numQuestions={questions.length}/>
      
      <div className="question-list">
      {
        questions.map((question, i) => 
        {
          return ( 
          <Question key={i} content={question.content}
                    author={question.author} 
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
          >
          {
            !question.isAnswered &&
            
            <>
              <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
              <img src={checkImg} alt="Dar destaque a pergunta"/>  
              </button>
              <button type="button" onClick={() => handleAnsweredQuestion(question.id)}>
                <img src={answerImg} alt="Responder Pergunta"/>  
              </button>
            </>
          }
            <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
              <img src={deleteImg} alt="Excluir pergunta"/>  
            </button>
          </Question>)
        })
      }
      </div>

    </main>
  </div> 
  )
}