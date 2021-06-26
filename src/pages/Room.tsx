
import { useParams } from 'react-router-dom';
import { RoomCode } from "../components/RoomCode";
import { Button } from "../components/Button";

import logoImg from '../assets/images/logo.svg';
import "../styles/room.scss";
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string,
{
  author: 
  {
    name: string;
    avatar: string;
  }

  content: string;
  isAnshered: boolean;
  isHighligted: boolean;
}>

type Question = 
{
  id: string;

  author: 
  {
    name: string;
    avatar: string;
  }

  content: string;
  isAnshered: boolean;
  isHighligted: boolean;

}

type RoomParams =
{
  id: string;
}


export function Room()
{
  const { user } = useAuth();
  const params = useParams<RoomParams>(); 
  const [newQuestion, setNewQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  let numQuestions = questions.length;

  useEffect(() => 
  {
     const roomRef = database.ref(`rooms/${params.id}`);

     roomRef.on('value', room => 
     {
       const firebasequestions: FirebaseQuestions = room.val().questions ?? {};
       
       const parsedQuestions = Object.entries(firebasequestions).map(([key, value]) => 
       {
         return {
           id: key,
           content: value.content,
           author: value.author,
           isHighligted: value.isHighligted,
           isAnshered: value.isAnshered,
         }
       });

       setTitle(room.val().title);
       setQuestions(parsedQuestions);
     });
  }, [params.id]);  

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

      {JSON.stringify(questions)}
    </main>
  </div> 
  )
}