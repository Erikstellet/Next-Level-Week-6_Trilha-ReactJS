import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from '../Button/styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & 
{isOutlined?: boolean};

export function Button({isOutlined = false, ...props}: ButtonProps)
{
  return (
  <ButtonContainer>
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
  </ButtonContainer>
  )
}   