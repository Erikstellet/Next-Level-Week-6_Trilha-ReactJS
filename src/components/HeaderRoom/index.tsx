import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../../services/firebase';

import { ThemeContext } from '../../contexts/ThemeContext';

import logoImg from '../../assets/images/logo.svg';
import { Button } from '../Button';
import { HeaderContainer } from './styles';
import { ThemeButton } from '../ThemeButton';
import { RoomCode } from '../RoomCode';

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

  function Orientation()
  {
    return EndRoom ? '3fr 3fr 4fr' : '1fr 1fr'; 
  }

  return (
   <HeaderContainer theme={colors} orientation={Orientation()}>
     <div className="content">
        <a href="/ ">{ <img src={logoImg} alt="Letmeask"/> }</a>
 
        {
          EndRoom && <Button isOutlined onClick={() => handleEndRoom()}>
                       Encerrar Sala
                     </Button>
        }

        <RoomCode code={id} />

       <ThemeButton />
     </div>
   </HeaderContainer>
  )
}