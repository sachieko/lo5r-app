import { useState, useEffect } from "react";
import axios from "axios";
import { TQuestion } from "./types";
const APIURL: string = import.meta.env.VITE_API_URL;

export const useQuestions = function () {
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  useEffect(() => {
    const getQuestions = async function () {
      try {
        const results = await axios.get(`${APIURL}/questions/`);
        const data: TQuestion[] = results.data; // Assuming the API response is an array of IQuestion
        setQuestions(data); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getQuestions();
  }, [APIURL]);
  return questions;
};
