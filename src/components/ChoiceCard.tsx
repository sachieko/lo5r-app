import './ItemCard.scss';
import FetchedParagraphs from '../helpers/LinkParser';

interface IchoiceProps {
  choice: string;
  stat: string;
  info: string;
};

export const ChoiceCard = function({choice, stat, info}: IchoiceProps) {
  if (info) {
    const parablocks = FetchedParagraphs(info.split('\n'));

    return (
      <div className='card'>
        <div className='title'>{choice}</div>
        <div className='emphasis'>{stat}</div>
        <div className='desc'>
          {parablocks}
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
        <div className='title'>{choice}</div>
        <div className='emphasis'>{stat}</div>
    </div>
  );
};