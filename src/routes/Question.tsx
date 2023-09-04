import { NavLink, useLoaderData, Params } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { getQuestions } from '../helpers/questionHelpers';
import './Question.scss'
// This is static at 20 but if it ever changes in future editions, just adjust this number.
import { IQuestion } from '../helpers/interfaces';
import { ItemCard } from '../components/ItemCard';

export async function loader() {
  const questions = await getQuestions();
  return  questions;
};

export default function Question({ params }: { params: Params<string>}) {
  const questions = useLoaderData() as IQuestion[];
  const questionId = Number(params.id);
  const currentQuestion = questions[questionId - 1]; // Id in database does not include 0 so shift array left 1
  const { title, info, detail, id, image } = currentQuestion;

  const questionNav = questions.map(question => {
    return (
      <NavLink 
          key={question.id}
          to={`/questions/${question.id}`}
          className={({ isActive, isPending }) => 
          isActive ? 'active' : isPending ? 'pending' : ''} 
        >
      <div className='navLink'>
          {question.id}
      </div>
        </NavLink>
    )
  })

  const choices = currentQuestion.choices.map(choice => {
    return (
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceInfo} />
    )
  }) 

  return (
      <>
      <nav className='questionNav'>
        {questionNav}
      </nav>
      {questionId && <ItemCard title={title} desc={detail} url={null} />}
      <div>
      {choices}
      </div>
    </>
  );
};
