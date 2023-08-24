import axios from 'axios';
const APIURL: string = 'http://localhost:8080/lore/'; // TO DO: Refactor when deployed'

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
export async function getLore(id: string | undefined) {
  try {
    const results = await axios.get(APIURL + id);
    const lore = results.data;
    return lore;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};