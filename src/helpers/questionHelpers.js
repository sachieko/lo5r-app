import axios from "axios";
const APIURL = 'http://localhost:8080/questions/';

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
    const results = await axios.get(APIURL);
    const questions = results.data;
    return questions;
  } catch (error) {
    console.error("Error parsing JSON:", error);
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
export async function getQuestion(id) {
  try {
    const results = await axios.get(APIURL + id);
    const question = results.data;
    return question;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

export const getQuestionNumber = function(int) {
  const result = [];
  for (let i = 0; i < int; i++) {
    result.push(`${i}`);
  }
  return result;
};