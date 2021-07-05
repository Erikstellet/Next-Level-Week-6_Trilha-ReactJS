import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { useRoom } from '../hooks/useRoom';
import { RoomCode } from "../components/RoomCode";
import { Button } from "../components/Button";
import { Question } from "../components/Question";

import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';
import "../styles/adminRoom.scss";

type RoomParams =
{
  id: string;
}

export function AdminRoom()
{
  const history = useHistory();
  const params = useParams<RoomParams>(); 
  const { title, questions } = useRoom(params.id);

  let numQuestions = questions.length;

  async function handleEndRoom()
  {
    await database.ref(`rooms/${params.id}`).update
    ({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleHighlightQuestion  (questionId: string)
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
    <header>
      <div className="content">

        <img src={logoImg} alt="Letmeask" />

        <div>
          <RoomCode code={params.id} />
          <Button isOutlined onClick={() => handleEndRoom()}>
            Encerrar Sala
          </Button>
        </div>

      </div>
    </header>

    <main className="main-room">
      <div className="room-title">
        <h1>{title}</h1>
        <span>
          {numQuestions} &nbsp;  
          {
            numQuestions > 1 ? `perguntas` 
            : numQuestions <= 0 ? `não há perguntas` 
            : `pergunta`
          }
        </span>
      </div>
      
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