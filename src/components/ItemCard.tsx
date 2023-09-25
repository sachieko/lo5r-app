import { Link } from "react-router-dom";
import "./ItemCard.scss";
import FetchedParagraphs from "../helpers/LinkParser";

interface IitemProps {
  title: string;
  desc: string;
  url?: string;
}

export const ItemCard = function ({ title, desc, url }: IitemProps) {
  const parablocks = FetchedParagraphs(desc.split("\n"));

  return (
    <div className={`card`}>
      {url ? (
        <Link to={url}>
          <div className="title">{title}</div>
        </Link>
      ) : (
        <div className="title">{title}</div>
      )}
      <div className="desc">{parablocks}</div>
    </div>
  );
};
