import { useLoaderData, Params } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';
import { getRule } from '../helpers/ruleHelpers';
import FetchedParagraphs from '../helpers/LinkParser';

interface Iloader {
  id: number;
  title: string;
  detail: string;
  image: string | null;
  header: string;
  content: string;
};

export async function loader({ params }: { params: Params<string>}) {
  const ruleData = await getRule(params.ruleId);
  return  ruleData;
};

export default function Rule() {
  const rule = useLoaderData() as Iloader[];

  // All rules have the title and info sent back, but this is inefficient and will be refactored later on the API end.
  const title = rule[0].title;
  const details = FetchedParagraphs(rule[0].detail.split('\n'));

  const cards = rule.map(card => {
    return ( 
      <ItemCard key={card.id} title={card.header} desc={card.content} url={''} />
    );
  });

  return (
    <>
      <div className='card'>
        <div className='title'>{title}</div>
      <div className='desc'>
        {details}
      </div>
      {cards}
      </div>
    </>
  );
};
