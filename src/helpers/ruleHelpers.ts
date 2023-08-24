import axios from 'axios';
const APIURL: string = import.meta.env.VITE_API_URL;

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
    const results = await axios.get(`${APIURL}/rules/${id}`);
    const rule = results.data;
    return rule;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};