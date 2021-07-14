import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaRegMoon, FaSun } from 'react-icons/fa';
import {ButtonContainer} from './styles';

export function ThemeButton()
{
  const { theme, setTheme, colors } = useContext(ThemeContext);
  
  return (
  <ButtonContainer theme={colors}>
    <input onClick={() => setTheme(!theme)} 
           type="checkbox" aria-label="Selecione o Tema"/>
    {
      theme ? <FaSun className="icons moon"/>
            : <FaRegMoon className="icons sun"/>
    }
  </ButtonContainer>
  )
}

