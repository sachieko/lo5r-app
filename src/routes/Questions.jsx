import { useState, useEffect } from 'react';
import axios from 'axios';
import { ItemCard } from '../components/ItemCard';
// Change this to url that hosts the API
const APIURL = 'http://localhost:8080/questions'

export const Questions = function() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!questions.length) {
      axios.get(APIURL)
        .then(res => {
          setQuestions(res.data.map(question => <ItemCard key={question.id} title={question.title} desc={question.detail} />));
        })
        .catch(err => {
          console.error('Error: ', err);
          setQuestions(<ItemCard key={1} title={'An Error Occurred'} desc={'The server is likely down at the moment.'} />)
        });
    }
  },[]);

  return (
      <>
      {questions}
      </>
  );
};
