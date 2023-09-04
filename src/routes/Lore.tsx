import { useLoaderData, Params } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';
import { getLore } from '../helpers/loreHelpers';
import FetchedParagraphs from '../helpers/LinkParser';
import { ILore } from '../helpers/interfaces';

interface Iloader extends ILore {};

export async function loader({ params }: { params: Params<string>}) {
  const loreData = await getLore(params.loreId);
  return  loreData;
};

export default function Lore() {
  const lore = useLoaderData() as Iloader[];

  // All lore will have the title and detail sent back, but this is inefficient and will be refactored later on the API end.
  const title = lore[0].title;
  const details = FetchedParagraphs(lore[0].detail.split('\n'));

  const cards = lore[0].cards.map(card => {
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
