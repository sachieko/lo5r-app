import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import ErrorPage from "./routes/ErrorPage";
import { Index } from "./routes/index";
import Question from "./routes/Question";
import Rule, { loader as ruleLoader } from "./routes/Rule";
import Lore, { loader as loreLoader } from "./routes/Lore";
import { Opportunity } from "./routes/Opportunity.js";
import { Technique } from "./routes/Technique.js";

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
            path: "lore",
            element: <div>browse lore</div>,
          },
          {
            path: "lore/:loreId",
            element: <Lore />,
            loader: loreLoader,
          },
          {
            path: "rules",
            element: <div>browse rules</div>,
          },
          {
            path: "rules/:ruleId",
            element: <Rule />,
            loader: ruleLoader,
          },
          {
            path: "opps/",
            element: <Opportunity />,
          },
          {
            path: "techniques/",
            element: <Technique />,
          },
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
