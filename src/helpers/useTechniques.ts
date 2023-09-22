import { useState, useEffect } from 'react';
import axios from 'axios';
import { ITechnique } from './interfaces';
const APIURL: string = import.meta.env.VITE_API_URL;

export const useTechniques = function() {
  const [techniques, setTechniques] = useState<ITechnique[]>([]);

  useEffect(() => {
    const getTechniques = async function() {
      try {
        const results = await axios.get(`${APIURL}/techniques/`);
        const data: ITechnique[] = results.data;
        setTechniques(data); // Update the state with the resolved data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getTechniques();
  }, [APIURL]);

  return techniques;
};