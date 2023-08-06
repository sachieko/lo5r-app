import React from 'react';
import { Link } from 'react-router-dom';

const keywordToUrlMap = {
  bushido: '/bushido-page',
  crab: '/lore/1'
};

const replaceKeywordsWithLinks = (paragraph) => {
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

const FetchedParagraphs = ( paragraphs ) => {
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{replaceKeywordsWithLinks(paragraph)}</p>
      ))}
    </div>
  );
};

export default FetchedParagraphs;