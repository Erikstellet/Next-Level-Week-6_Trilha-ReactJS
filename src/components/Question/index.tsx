import { ReactNode } from "react";
import cx from 'classnames';
import { QuestionContainer } from "./styles";

type QuestionProps = 
{
  content: string;
  author: 
  {
    name: string;
    avatar: string;
  }
  children?: ReactNode
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({content, author, children, isAnswered = false, isHighlighted = false}: QuestionProps)
{
  return (
  <QuestionContainer>
    <div className={cx('question',{ answered: isAnswered}, { highlighted: isHighlighted && !isAnswered})}>
      
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <span>
            <img src={author.avatar} alt={author.name}/>
            <span>{author.name}</span>
          </span>
        </div>
        
        <div className="button-container">
          {children}
        </div>
      </footer>   
      
  </div>
  </QuestionContainer>
  )
}