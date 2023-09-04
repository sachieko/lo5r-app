import { NavLink, useLoaderData, Params } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { getQuestion, getQuestionNumber } from '../helpers/questionHelpers';
import './Question.scss'
// This is currently static at 20 but if it ever changes in future editions, just adjust this number.
const questionAmount: number = 20;

interface Icard {
  id: number;
  stat: string | null;
  choice: string | null;
  choiceInfo: string | null;
};

interface Iloader {
  title: string;
  info: string;
  detail: string;
  id: number;
  image: string | null;
  choices: Icard[];
};

export async function loader({ params }: { params: Params<string>}) {
  const question = await getQuestion(params.questionId);
  return  question;
};

export default function Question() {
  const question = useLoaderData() as Iloader[];
  // All questions have the title and info sent back, but this is inefficient and will be refactored later on the API end.
  const title = question[0].title;
  const desc = question[0].info;

  const choices = question[0].choices.map(choice => {
    return ( 
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceInfo} />
    );
  });

  const questionNav = getQuestionNumber(questionAmount).map(number => {
    return (
      <NavLink 
          key={number}
          to={`/questions/${number}`}
          className={({ isActive, isPending }) => 
          isActive ? 'active' : isPending ? 'pending' : ''} 
        >
      <div className='navLink'>
          {number}
      </div>
        </NavLink>
    )
  })

  return (
      <>
      <nav className='questionNav'>
        {questionNav}
      </nav>
      <div className='card'>
        <div className='title'>{title}</div>
      <div className='desc'>
        {desc}
      </div>
      {choices}
    </div>
      </>
  );
};
