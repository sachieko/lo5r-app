import { Link } from "react-router-dom";
import "./ItemCard.scss";
import LinkParsedText from "../helpers/LinkParser";

interface IitemProps {
  title: string;
  desc: string;
  url?: string;
  children?: JSX.Element[];
  book?: string;
  pg?: number;
  noLink?: boolean;
}

export const ItemCard = function ({
  title,
  desc,
  url,
  children,
  book,
  pg,
  noLink
}: IitemProps) {
  return (
    <div className={`card`}>
      {url ? (
        <Link to={url}>
          <div className="title">{title}</div>
        </Link>
      ) : (
        <div className="title">{title}</div>
      )}
      <div className="desc">
        {noLink ? desc : <LinkParsedText text={desc}></LinkParsedText>}
      </div>
      {children}

      <span className="card-bookRef">
        {book ? `${book} pg. ${pg === 0 || undefined ? "N/A" : pg}` : ``}
      </span>
    </div>
  );
};
