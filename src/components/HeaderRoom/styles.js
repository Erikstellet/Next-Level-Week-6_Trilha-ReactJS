import styled from 'styled-components';

export const HeaderContainer = styled.header
`
  padding: 24px;
  border-bottom: 1px solid #d3d3d3;
  background: ${({theme}) => theme.gray};

  .content
  {
    padding-top: 20px;
    display: grid;
    grid-template-columns: ${({orientation}) => orientation}; 
    max-width: 80rem;
    margin: 0 auto;
    justify-content: between;
    align-items: center;

    > img 
    {
      max-height: 4.5rem;
    }
  }
`