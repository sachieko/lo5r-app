import axios from 'axios';
const APIURL: string = import.meta.env.VITE_API_URL;

/*

  Lore data format:
  { 
    id: number,
    title: string,
    detail: string,
    image: url string,
    cards: [ 
      {
        id: number,
        header: string,
        content: string,
      }, ...
    ]
  }

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