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
export async function getLore(id: string | undefined) {
  try {
    const results = await axios.get(`${APIURL}/lore/${id}`);
    const lore = results.data;
    return lore;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};