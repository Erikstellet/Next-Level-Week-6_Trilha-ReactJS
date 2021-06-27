import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { RoomCode } from "../components/RoomCode";
import { Button } from "../components/Button";
import { Question } from "../components/Question";

import logoImg from '../assets/images/logo.svg';
import "../styles/room.scss";
import { useRoom } from '../hooks/useRoom';

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
  let numQuestions = questions.length;

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

      isHighligted: false,
      isAnshered: false,
    }

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion('');
  }

  return (
  <div id="page-room">
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask"/>
        <RoomCode code={params.id}/>
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
      
      <div className="question-list">
      {
        questions.map((question, i) => 
        {
          return <Question key={i} content={question.content} author={question.author}/>
        })
      }
      </div>

    </main>
  </div> 
  )
}