import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
import ErrorPage from "./routes/ErrorPage";
import { Index } from "./routes/index";
import Question from "./routes/Question";
import { Rule } from "./routes/Rule";
import { Opportunity } from "./routes/Opportunity.tsx";
import { Technique } from "./routes/Technique.tsx";
import { Lore } from "./routes/Lore.tsx";
import { Conditions } from "./routes/Conditions.tsx";
import { Terrains } from "./routes/Terrains.tsx";
import { Qualities } from "./routes/Qualities.tsx";
import { Weapons } from "./routes/Weapons.tsx";

const router = createBrowserRouter(
  [
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
              errorElement: <ErrorPage />,
            },
            {
              path: "lore/:dataId",
              element: <Lore />,
              errorElement: <ErrorPage />,
            },
            {
              path: "rules/:dataId",
              element: <Rule />,
              errorElement: <ErrorPage />,
            },
            {
              path: "opps/",
              element: <Opportunity />,
              errorElement: <ErrorPage />,
            },
            {
              path: "techniques/:dataId",
              element: <Technique />,
              errorElement: <ErrorPage />,
            },
            {
              path: "conditions/:dataId",
              element: <Conditions />,
              errorElement: <ErrorPage />,
            },
            {
              path: "terrains/:dataId",
              element: <Terrains />,
              errorElement: <ErrorPage />,
            },
            {
              path: "qualities/:dataId",
              element: <Qualities />,
              errorElement: <ErrorPage />,
            },
            {
              path: "weapons/:dataId",
              element: <Weapons />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{v7_startTransition: true}}/>
  </React.StrictMode>
);
