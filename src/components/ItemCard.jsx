import { Link } from 'react-router-dom';
import './ItemCard.scss';
import FetchedParagraphs from '../helpers/LinkParser';

export const ItemCard = function({title, desc, url}) {
  const parablocks = FetchedParagraphs(desc.split('\n'));
  
  return (
    <div className='card'>
      <Link to={url}>
        <div className='title'>{title}</div>
      </Link>
      <div className='desc'>
        {parablocks}
      </div>
    </div>
  );
};