import axios from 'axios';
const APIURL: string = import.meta.env.VITE_API_URL;

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
export async function getQuestions() {
  try {
    const results = await axios.get(`${APIURL}/questions`);
    const questions = results.data;
    return questions;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

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
export async function getQuestion(id: string | undefined) {
  try {
    const results = await axios.get(`${APIURL}/questions/${id}`);
    const question = results.data;
    return question;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

export const getQuestionNumber = function(int: number) {
  const result = [];
  for (let i = 1; i < int +1; i++) {
    result.push(`${i}`);
  }
  return result;
};