import { Link } from "react-router-dom";
import { useKeywordMap } from "./useKeywordMap";

const replaceKeywordsWithLinks = (text: string) => {
  const { keywordMap } = useKeywordMap();
  const bracketRegex = /\[([^\]]+)\]/g;
  const result = [];
  if (!keywordMap) return [text];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = bracketRegex.exec(text)) !== null) {
    const [fullMatch, textInside] = match;
    const matchIndex = match.index;

    // Add text before the match
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex));
    }

    // Get URL from keywordMap and create Link component
    const url = keywordMap[textInside];
    if (url) {
      result.push(
        <span key={key++}>
          <Link
            className="link"
            key={key++}
            to={url}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            {textInside}
          </Link>
        </span>
      );
    } else {
      result.push(<span key={key++}>{textInside}</span>);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add remaining text after the last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }
  return result;
};
const LinkParsedText = ({ text }: { text: string }): JSX.Element => {
  const { keywordMap, loading } = useKeywordMap();
  // If keyword map is null, skip so app still functions in case keywordMap has issues
  if (loading || !keywordMap) return <>{text}</>;
  const elements = replaceKeywordsWithLinks(text);
  return (
    <div>
      {elements.map((element, index) => {
        return <span key={index}>{element}</span>;
      })}
    </div>
  );
};
export default LinkParsedText;
