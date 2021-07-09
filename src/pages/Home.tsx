import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';  

import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import "../styles/auth.scss"

import { MainBanner } from '../components/MainBanner';
import { ThemeButton } from '../components/ThemeButton';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Home()
{
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom()
  {
    if(!user)
    { 
      await signInWithGoogle();
    }
    
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent)
  {
    event.preventDefault();

    if(roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    
    if(!roomRef.exists()) 
    {
      alert('Room does not exist');
      return;
    }

    if(roomRef.val().endedAt)
    {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  } 

  return (
  <div id="page-auth">

    <MainBanner/>   

    <main className="main-auth">
      <div className="main-content">
        
        <ThemeButton />
        <img src={logoImg} alt="Letmeask" />
      
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIcon} alt="Logo do Google" />
          <span>Crie sua sala com o Google</span> 
        </button>

        <div className="separator"> ou entre em uma sala </div>
      
        <form onSubmit={handleJoinRoom}>
          <input type="text" placeholder="Digite o código da sala"
                 onChange={event => setRoomCode(event.target.value)}
                 value={roomCode}/>
          <Button type="submit"> Entrar na sala </Button>
        </form>

      </div>
    </main>

  </div>
  )
}