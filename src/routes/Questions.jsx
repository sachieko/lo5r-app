import { useState, useEffect } from 'react';
import axios from 'axios';
import { ItemCard } from '../components/ItemCard';
// Change this to url that hosts the API
const APIURL = 'http://localhost:8080/questions'

export const Questions = function() {
  /*
  * The questions coming from the API are of the form:
  * [
  *   @data = (
  *   id: 1, 
  *   title: 'string',
  *   detail: 'string',
  *   image_url: 'string'
  *   ), . . .
  * ]
  * 
  */
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!questions.length) {
      axios.get(APIURL)
        .then(res => {
          setQuestions(res.data.map(question => (
          <ItemCard key={question.id} title={question.title} desc={question.detail} url={'/questions/' + question.id} />
          )));
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
