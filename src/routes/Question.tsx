import { NavLink, useParams } from 'react-router-dom';
import { ChoiceCard } from '../components/ChoiceCard';
import { useQuestions } from '../helpers/useQuestions';
import './Question.scss'

export default function Question() {
  const { questionId } = useParams();
  const questions = useQuestions();

  if (questions.length === 0) {
    return <div>Loading. . .</div>;
  }

  const index = Number(questionId); // Originally fetched as a string from the url.
  const currentQuestion = questions[index - 1]; // Id in database does not include 0 so shift array left 1

  const { title, info, detail } = currentQuestion; // image is unused currently, and generally null.

  // Create nav component as a list
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
    </>
  );
};