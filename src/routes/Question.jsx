import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { getQuestion, getQuestionNumber } from '../helpers/questionHelpers';

export async function loader({ params }) {
  const question = await getQuestion(params.questionId);
  return  question;
}

export default function Question() {
  const question = useLoaderData();

  const title = question[0].title;
  const desc = question[0].info;

  const choices = question.map(choice => {
    return ( 
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceinfo} />
    );
  });

  const questionNav = getQuestionNumber(20).map(number => {
    return (
      <div className='navLink' key={number}>
        <NavLink 
          to={`/questions/${number}`}
          className={({ isActive, isPending }) => 
          isActive ? "active" : isPending ? "pending" : ""} 
        >
          {number}
        </NavLink>
      </div>
    )
  })

  return (
      <>
      <nav>
        {questionNav}
      </nav>
      <div className="card">
        <div className="title">{title}</div>
      <div className="desc">
        {desc}
      </div>
      {choices}
    </div>
      </>
  );
};
