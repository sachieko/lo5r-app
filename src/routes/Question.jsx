import { NavLink, useLoaderData } from "react-router-dom";
import { ChoiceCard } from "../components/ChoiceCard";
import { getQuestion, getQuestionNumber } from "../helpers/questionHelpers";
import "./Question.scss"
// This is currently static at 20 but if it ever changes, just adjust this number.
const questionAmount = 20;

export async function loader({ params }) {
  const question = await getQuestion(params.questionId);
  return  question;
}

export default function Question() {
  const question = useLoaderData();

  // All questions have the title and info sent back, but this is inefficient and will be refactored later on the API end.
  const title = question[0].title;
  const desc = question[0].info;

  const choices = question.map(choice => {
    return ( 
      <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceinfo} />
    );
  });

  const questionNav = getQuestionNumber(questionAmount).map(number => {
    return (
      <NavLink 
          key={number}
          to={`/questions/${number}`}
          className={({ isActive, isPending }) => 
          isActive ? "active" : isPending ? "pending" : ""} 
        >
      <div className="navLink">
          {number}
      </div>
        </NavLink>
    )
  })

  return (
      <>
      <nav className="questionNav">
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
