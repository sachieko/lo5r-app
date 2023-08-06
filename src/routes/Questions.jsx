import { useLoaderData } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';
import { getQuestions } from '../helpers/questionHelpers';
// Change this to url that hosts the API
const APIURL = 'http://localhost:8080/questions'

export async function loader({ params }) {
  const questions = await getQuestions();
  return { questions };
};

export default function Questions() {
  const { questions } = useLoaderData();

  const questionsView = questions.map(question => {
    return (
     <ItemCard key={question.id} title={question.title} desc={question.detail} url={'/questions/' + question.id} />
    );
  });

  return (
      <>
      {questionsView}
      </>
  );
};
