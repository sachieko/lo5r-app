import { Link } from 'react-router-dom';

interface IkeywordToUrlMap {
  [key: string]: string;
};

const keywordToUrlMap: IkeywordToUrlMap = {
  bushido: '/lore/1',
  compassion: '/lore/1',
  honor: '/lore/1',
  courage: '/lore/1',
  courtesy: '/lore/1',
  respect: '/lore/1',
  duty: '/lore/1',
  righteousness: '/lore/1',
  sincerity: '/lore/1',
  crab: '/lore/',
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