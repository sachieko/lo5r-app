import axios from 'axios';
const APIURL: string = 'http://localhost:8080/rules/'; // TO DO: Refactor when deployed'

  /*
  * The data coming from the API are of the form:
  * [
  *   @data = (
  *   title: string,
  *   detail: string,
  *   image: string(url),
  *   cardId: number,
  *   cardTitle: string,
  *   cardContent: string
  *   ), . . .
  * ]
  * 
  */
export async function getRule(id: string | undefined) {
  try {
    const results = await axios.get(APIURL + id);
    const rule = results.data;
    return rule;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};