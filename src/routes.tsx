import { createBrowserRouter } from "react-router";
import HomePage from "~/routes/Home";

export const router = createBrowserRouter([
  {
    index: true,
    element: <HomePage />,
  },
]);
