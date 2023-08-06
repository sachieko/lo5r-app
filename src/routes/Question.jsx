import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { getQuestion, getQuestionNumber } from '../helpers/questionHelpers';

export async function loader({ params }) {
  const question = await getQuestion(params.questionId);
  return  question;
}

export default function Question() {
  const question = useLoaderData();

  const choices = question.map(choice => {
    return ( 
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.info} />
    );
  });

  const questionNav = getQuestionNumber(20).map(number => {
    return (
      <div className='navLink'>
        <NavLink 
          to={`/questions/${number}`}
          className={({ isActive, isPending }) => 
          isActive ? "active" : isPending ? "pending" : ""} 
        >
        <Link to={`/questions/${number}`} >
          {number}
        </Link>
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
        <div className="title"></div>
      <div className="desc">
      </div>
      {choices}
    </div>
      </>
  );
};
