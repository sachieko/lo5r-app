import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div id="error-page">
      <ItemCard
        title={"Oops! Were you expecting something else?"}
        desc={`Sorry, an unexpected error occurred: \n${errorMessage}\nIf this error persists for too long, feel free to notify me by making an issue at https://github.com/sachieko/lo5r-app/issues`}
      />
    </div>
  );
}
