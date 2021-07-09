import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { Button } from "../components/Button";
import { Question } from "../components/Question";

import "../styles/room.scss";
import { useRoom } from '../hooks/useRoom';
import { HeaderRoom } from '../components/HeaderRoom';
import { RoomTitle } from '../components/RoomTitle';
import { QuestionList } from '../components/QuestionList';

type RoomParams =
{
  id: string;
}

export function Room()
{
  const { user } = useAuth();
  const params = useParams<RoomParams>(); 
  const [newQuestion, setNewQuestion] = useState('');
  const { title, questions } = useRoom(params.id);

  async function handleSendQuestion(event: FormEvent)
  {
    event.preventDefault();

    if(newQuestion.trim() === '') return;
    
    if(!user)
    {
      throw new Error('You must be logged in');
    }

    const question = 
    {
      content: newQuestion,
      author: 
      {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined)
  {
    if(likeId)
    {
      await database.ref(`rooms/${params.id}/questions/${questionId}/likes/${likeId}`).remove();
    }
    else
    {
      await database.ref(`rooms/${params.id}/questions/${questionId}/likes`).push({authorId: user?.id});
    }
  }

  return (
  <div id="page-room">

    <HeaderRoom id={params.id}/>

    <main className="main-room">

      <RoomTitle roomTitle={title} numQuestions={questions.length} />

      <form onSubmit={handleSendQuestion}>
        <textarea placeholder="O que você quer Perguntar?"
                  onChange={event => setNewQuestion(event.target.value)}
                  value={newQuestion}
        />
        <div className="form-footer">
          { 
            user ? <div className="user-info">
                     <img src={user.avatar} alt={user.name}/>
                     <span>{user.name}</span>
                   </div>
                 : <>
                     <span> Para enviar uma pergunta, <button>faça seu login</button>.</span>
                   </>
          }
          <Button type="submit" disabled={!user}> Enviar pergunta </Button>
        </div>
      </form> 

      <QuestionList id={params.id}/>

    </main>
  </div> 
  )
}