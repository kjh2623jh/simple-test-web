import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./Test";
import Result from "./Result";
import ResultErrorPage from "./ResultErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/result/:result",
    element: <Result />,
    errorElement: <ResultErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
