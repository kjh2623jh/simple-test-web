import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./Test";
import Result from "./Result";
import "./css/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/reslut/:id",
    element: <Result />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
