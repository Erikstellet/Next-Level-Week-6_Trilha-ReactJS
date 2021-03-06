import styled from 'styled-components';

export const QuestionContainer = styled.div
`
  .question
  {
    padding: 14px 1.6rem;
    margin-top: 20px;
    background: #FEFEFE;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0);
    border-radius: 8px;

    & + .question
    {
      margin-top: 12px;
    }

    &.highlighted
    {
      background-color: #F4F0FF;
      border: 1px solid #835AFD; 

      footer .user-info span
      {
        color: #29292E;
      } 
    }

    &.answered
    {
      background: #DBDCDD;
    }

    p
    {
      color: #29292E;
    }

    footer
    {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 24px;

      .user-info
      {
        display: flex;
        justify-content: center;
        align-items: center;

        span
        {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #EEEEEE;
          border-radius: 9999px;
          padding: 6px 10px;
          color: #FFF;
          font-weight: 500;
          font-size: 16px;
          border: 1px solid #835AFD; 

          img
          {
            height: 32px;
            border-radius: 50%;
            margin: 0 10px 0 0;
          }
    
          span
          {
            color: #737380;
            font-weight: 500;
            font-size: 14px;
            border: none; 
          }
        }
      }

      .button-container
      {
        display: flex;

        button
        {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          padding: 0 8px;
    
          &.like-button 
          {
            display: flex;
            align-items: flex-end;
            color: #737380;
            gap: 8px;
            transition: 0.2s;
    
            &.liked
            { 
              color: #835AFD;
    
              svg path
              {
                stroke: #835AFD;
              }
            }
          }
    
          &:hover
          {
            filter: brightness(0.5); 
          }
        }
      }
    }
  }
`