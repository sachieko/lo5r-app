import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { getQuestions } from '../helpers/questionHelpers';
import './Question.scss'
// This is static at 20 but if it ever changes in future editions, just adjust this number.
import { IQuestion } from '../helpers/interfaces';

export async function loader() {
  const questions = await getQuestions();
  return  questions;
};

export default function Question() {
  const questions = useLoaderData() as IQuestion[];
  const { questionId } = useParams();
  const index = Number(questionId); // Originally fetched as a string from the url.
  const currentQuestion = questions[index - 1]; // Id in database does not include 0 so shift array left 1
  const { title, info, detail } = currentQuestion; // image is unused currently, and generally null.

  const questionNav = questions.map(question => {
    return (
      <NavLink 
          key={question.id}
          to={`/questions/${question.id}`}
          className={({ isActive, isPending }) => 
          isActive ? 'active' : isPending ? 'pending' : ''} 
        >
        <div className='navLink'>
          {question.title} {[question.detail.slice(0, 38)]}...
        </div>

      </NavLink>
    )
  })
  // Create a card for the current question's choices
  const choices = currentQuestion.choices.map(choice => {
    return (
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceInfo} />
    );
  }) ;

  return (
      <>
      <nav className='questionNav'>
        {questionNav}
      </nav>
      {questionId && (
        <div className='card' >
          <div className='title'>{title}</div>
          <div className='desc'>
            <p>
            {detail}
            </p>
            <p>
            {info}
            </p>
            {choices}
          </div>
        </div>
      )}
    </>
  );
};