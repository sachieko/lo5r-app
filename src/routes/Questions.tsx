import { useLoaderData } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';
import { getQuestions } from '../helpers/questionHelpers';

export async function loader() {
  const questions = await getQuestions();
  return { questions };
};

interface Iquestion {
  id: number;
  title: string;
  detail: string;
  info?: string;
  image_url?: string;
};

interface Iloader {
  questions: Iquestion[];
}

export default function Questions() {
  const { questions } = useLoaderData() as Iloader;

  const questionsView = questions.map((question: Iquestion) => {
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
