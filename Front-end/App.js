import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Signup from "./components/Sign_up";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Pok from "./components/Pok";
import Dashboard from "./components/Dashboard";

const App = () => {
  //document.body.style.background = "#e6e1e1ff";
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Pok />,
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/Body",
        element: <Body />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

// root.render(<App />);
