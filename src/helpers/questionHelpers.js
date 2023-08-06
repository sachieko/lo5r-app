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