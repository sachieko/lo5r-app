import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';
import { ChoiceCard } from '../components/ChoiceCard';
// Change this to url that hosts the API
const APIURL = 'http://localhost:8080/questions/'

export const Question = function() {
  const { questionId } = useParams();
  /*
  * The data coming from the API are of the form:
  * [
  *   @data = (
  *   id: 1, 
  *   title: 'string',
  *   info: 'string',
  *   choice: 'string',
  *   stat: 'string',
  *   choiceinfo: 'string'
  *   ), . . .
  * ]
  * 
  */
  const [question, setQuestion] = useState({});
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (1) {
      axios.get(APIURL + questionId)
        .then(res => {
          if(res.data[0]) {
            setQuestion(
              { 
                title: res.data[0].title,
                info: res.data[0].info
              }
            );
          }
          setChoices(res.data.map(choice => (
            <ChoiceCard key={choice.id} choice={choice.choice} stat={choice.stat} info={choice.choiceinfo} />
          )));
        })
        .catch(err => {
          console.error('Error: ', err);
          setQuestion(<ItemCard key={1} title={'An Error Occurred'} desc={'The server is likely down at the moment.'} />)
        });
    }
  },[]);

  return (
      <>
      <div className="card">
        <div className="title">{question.title}</div>
      <div className="desc">
        {question.info}
      </div>
      {choices}
    </div>
      </>
  );
};
