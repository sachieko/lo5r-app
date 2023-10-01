import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChoiceCard } from "../components/ChoiceCard";
import { useQuestions, columns } from "../helpers/useQuestions";
import "./Question.scss";
import { Table } from "../components/Table";
import { TQuestion } from "../helpers/types";

export default function Question() {
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const { questionId } = useParams() || 1;
  const questions = useQuestions();
  const currentQuestion = questions[Number(questionId) - 1]; // This gives us the current question to display
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(false);
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [setFadeIn]);

  if (questions.length === 0) {
    return <div>Loading. . .</div>;
  }

  const { title, info, detail } = currentQuestion; // image is unused currently, and generally null.

  // Create a card for the current question's choices
  const choices = currentQuestion.choices.map((choice) => {
    return (
      <ChoiceCard
        key={choice.id}
        choice={choice.choice}
        stat={choice.stat}
        info={choice.choiceInfo}
      />
    );
  });

  // If a particular row is clicked, it should redirect to the question url
  const handleRowClick = (row: TQuestion) => {
    if (Number(questionId) === row.id) {
      // Don't do anything if they click the same row!
      return;
    }
    setFadeIn(false); // Hide the current element
    setTimeout(() => {
      setFadeIn(true);
      navigate(`/questions/${row.id}`);
    }, 300);
  };

  return (
    <>
      <div className="question-table table-container">
        <Table
          data={questions}
          columns={columns}
          rowClick={handleRowClick}
          selected={Number(questionId)}
        />
      </div>
      <div className={`fadeElement ${fadeIn ? "fade" : ""}`}>
        <div
          className={"card question-card"}
        >
          <div className="title">{title}</div>
          <div className="desc">
            <p>{detail}</p>
            <p>{info}</p>
            {choices}
          </div>
        </div>
      </div>
    </>
  );
}
