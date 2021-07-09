import styled from 'styled-components';
import colors from '../../styles/colorPalettes'

export const AsideContainer = styled.aside
`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 60px;
  background: ${({theme}) => theme.violet};
  color: #fff;

  img {
    max-width: 32rem;
  }

  strong {
    font: 700 36px "Poppins", sans-serif;
  }

  p {
    font-size: 2.4rem;
    line-height: 3.2rem;
    margin-top: 1.6rem;
    color: #f8f8f8;
  }
`