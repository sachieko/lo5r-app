import { Link } from "react-router-dom";
import { keywordToUrlMap } from "./keywordMap";

const replaceKeywordsWithLinks = (paragraph: string) => {
  const words = paragraph.split(" ");

  return words.map((word, index) => {
    // Remove punctuation from the word to check against the keyword map
    const cleanedWord = word.replace(/[.,!?]/g, "").toLowerCase();

    if (keywordToUrlMap[cleanedWord]) {
      return (
        <Link key={index} to={keywordToUrlMap[cleanedWord]}>
          {word}{" "}
        </Link>
      );
    }
    return word + " ";
  });
};

const FetchedParagraphs = (paragraphs: string[]) => {
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{replaceKeywordsWithLinks(paragraph)}</p>
      ))}
    </div>
  );
};

export default FetchedParagraphs;
