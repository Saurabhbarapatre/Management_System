import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Signup from "./components/Sign_up";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Pok from "./components/Pok";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
import Onboard from "./components/Onboard";

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
        children: [
          {
            path: "/Body",
            element: <Body />,
          },
          {
            path: "/Dashboard",
            element: <Dashboard />,
          },
          {
            path: "/OnBoard",
            element: <Onboard />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

// root.render(<App />);
