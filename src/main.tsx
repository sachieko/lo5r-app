import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import ErrorPage from "./routes/ErrorPage";
import { Index } from "./routes/index";
import Question from "./routes/Question";
import { Rule } from "./routes/Rule";
import { Opportunity } from "./routes/Opportunity.js";
import { Technique } from "./routes/Technique.js";
import { Lore } from "./routes/Lore.js";
import { Conditions } from "./routes/Conditions.js";
import { Terrains } from "./routes/Terrains.js";

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
            path: "questions/:questionId",
            element: <Question />,
          },
          {
            path: "lore/:dataId",
            element: <Lore />,
          },
          {
            path: "rules/:dataId",
            element: <Rule />,
          },
          {
            path: "opps/",
            element: <Opportunity />,
          },
          {
            path: "techniques/",
            element: <Technique />,
          },
          {
            path: "conditions/:dataId",
            element: <Conditions />
          },
          {
            path: "terrains/:dataId",
            element: <Terrains />
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
