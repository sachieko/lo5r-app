import "./ItemCard.scss";
import LinkParsedText from "../helpers/LinkParser";

interface IchoiceProps {
  choice: string | null;
  stat: string | null;
  info: string | null;
}

export const ChoiceCard = function ({ choice, stat, info }: IchoiceProps) {
  if (info) {
    return (
      <div className="card">
        <div className="title">{choice}</div>
        <div className="emphasis">
          <LinkParsedText text={stat || ""}></LinkParsedText>
        </div>
        <div className="desc">
          <LinkParsedText text={info}></LinkParsedText>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="title">{choice}</div>
      <div className="emphasis">
        <LinkParsedText text={stat || ""}></LinkParsedText>
      </div>
    </div>
  );
};
