import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from '../services/firebase';

type QuestionType = 
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


export function useRoom(roomId: string)
{
  const [ questions, setQuestions ] = useState<QuestionType[]>([]);
  const [ title, setTitle ] = useState('');

  useEffect(() => 
  {
     const roomRef = database.ref(`rooms/${roomId}`);

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
  }, [roomId]);  

  return { questions, title }
}