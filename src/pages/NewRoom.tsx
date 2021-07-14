import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase';

import { MainBanner } from '../components/MainBanner';
import { useAuth } from '../hooks/useAuth';

import logoImg from '../assets/images/logo.svg';
import "../styles/auth.scss"
import { ThemeButton } from '../components/ThemeButton';
import { Button } from '../components/Button';

export function NewRoom()
{
  const [newRoom, setNewRoom] = useState('')
  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent)
  {
    event.preventDefault();

    if(newRoom.trim() === '') return;

    const roomRef= database.ref('rooms');

    const firebaseRoom = await roomRef.push
    ({
      title: newRoom,
      authorId: user?.id,
    });


    // O css de auth.scss interferiu em room.scss,
    // portanto é preciso usar ids ou classes diferentes em tags iguais.
    history.push(`/rooms/${firebaseRoom.key}`);
  }
  
  return (
  <div id="page-auth">

    <MainBanner />      
    
    <main className="main-auth">
      <div className="main-content">

        <ThemeButton />
        <img src={logoImg} alt="Letmeask" />
        <h2>Criar uma nova sala</h2>

        <form onSubmit={handleCreateRoom}>
          <input type="text" placeholder="Nome da sala" value={newRoom}
                 onChange={event => setNewRoom(event.target.value)}/>
          <Button type="submit"> Criar sala </Button>
        </form>

        <p>
          Quer entrar em uma sala já existente?
          <Link to="/ "> Clique aqui</Link>
        </p>
        
      </div>
    </main>
  </div>
  )
}