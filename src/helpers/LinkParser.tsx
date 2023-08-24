import { Link } from 'react-router-dom';

interface IkeywordToUrlMap {
  [key: string]: string;
}

const keywordToUrlMap: IkeywordToUrlMap = {
  bushido: '/lore/2',
  crab: '/lore/1',
  skill: '/rules/3'
};

const replaceKeywordsWithLinks = (paragraph: string) => {
  const words = paragraph.split(' ');

  return words.map((word, index) => {
    // Remove punctuation from the word to check against the keyword map
    const cleanedWord = word.replace(/[.,!?]/g, '').toLowerCase();

    if (keywordToUrlMap[cleanedWord]) {
      return (
        <Link key={index} to={keywordToUrlMap[cleanedWord]}>
          {word}{' '}
        </Link>
      );
    } else {
      return word + ' ';
    }
  });
};

const FetchedParagraphs = ( paragraphs: string[] ) => {
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{replaceKeywordsWithLinks(paragraph)}</p>
      ))}
    </div>
  );
};

export default FetchedParagraphs;