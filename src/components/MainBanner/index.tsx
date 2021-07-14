import { useContext } from 'react';
import illustration from '../../assets/images/illustration.svg';
import { AsideContainer } from "./styles";
import { ThemeContext } from '../../contexts/ThemeContext';

export function MainBanner()
{
  const { colors } = useContext(ThemeContext);

  return (
  <AsideContainer theme={colors}>
    <img src={illustration} alt="Ilustração de troca de perguntas"/>
    <strong>Crie salas de Q&amp;A ao-vivo</strong>
    <p>Tire as dúvidas da sua audiência em tempo-real</p>
  </AsideContainer>
  )
}