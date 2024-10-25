import { useState, useEffect } from "react";
import axios from "axios";
import { TQuestion, TableColumn } from "./types";
const { VITE_API_URL, VITE_API_TEST, TEST_MODE } = import.meta.env
const APIURL: string = TEST_MODE === "TRUE" ? VITE_API_TEST : VITE_API_URL;

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

export const columns: TableColumn<TQuestion, keyof TQuestion>[] = [
  {
    key: "title",
    header: "Question",
  },
];
