import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

const App = () => {
  document.body.style.background = "#e6e1e1ff";
  return (
    <div className="App">
      <Navbar />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
