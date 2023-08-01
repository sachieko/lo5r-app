import { Link } from "react-router-dom";
import './ItemCard.scss';

export const ItemCard = function({title, desc, url}) {
  const parablocks = desc.split('\n').map((para, index) => <p key={index}>{para}</p>);
  
  return (
    <div className="card">
      <Link to={url}>
        <div className="title">{title}</div>
      </Link>
      <div className="desc">
        {parablocks}
      </div>
    </div>
  );
};