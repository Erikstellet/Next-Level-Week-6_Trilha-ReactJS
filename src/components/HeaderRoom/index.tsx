import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

import { ThemeContext } from '../../contexts/ThemeContext';
import { RoomCode } from '../RoomCode';

import logoImg from '../../assets/images/logo.svg';
import { Button } from '../Button';

type HeaderRoomTypes = 
{
  id: string;
  EndRoom?: boolean;
}

export function HeaderRoom({ id, EndRoom = false }: HeaderRoomTypes)
{
  const { colors } = useContext(ThemeContext);
  const history = useHistory();

  async function handleEndRoom()
  {
    await database.ref(`rooms/${id}`).update
    ({
      endedAt: new Date(),
    });

    history.push('/');
  }

  return (
   <header>
     <div className="content">
       <img src={logoImg} alt="Letmeask"/>
      <div>
        <RoomCode code={id} />
        {
          EndRoom &&

          <Button isOutlined onClick={() => handleEndRoom()}>
            Encerrar Sala
          </Button>
        }
      </div>
     </div>
   </header>
  )
}