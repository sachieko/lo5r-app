import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import ErrorPage from "./routes/ErrorPage.jsx";
import { Index } from "./routes/index.jsx";
import Questions, { loader as questionsLoader }  from "./routes/Questions.jsx";
import Question, { loader as questionLoader } from "./routes/Question.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          { 
            path: "lore/:loreId",
            element: <div>lore placeholder</div>,
          },
          { 
            path: "rules/:ruleId",
            element: <div>rule placeholder</div>,
          },
          // { 
          //   path: "questions/:questionId",
          //   element: <Question />,
          // },
          { 
            path: "questions",
            element: <Questions />,
            loader: questionsLoader,
          },
          { 
            path: "questions/:questionId", 
            element: <Question />,
            loader: questionLoader,
          },
          { 
            path: "lore",
            element: <div>browse lore</div>,
          },
          { 
            path: "rules",
            element: <div>browse rules</div>,
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
