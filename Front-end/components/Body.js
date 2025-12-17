import { useState, useEffect } from "react";
import List from "./list";
import Add from "./Add";
import Pok from "./Pok";
import Navbar from "./Navbar";

const Body = () => {
  const [list, setlist] = useState([]);
  const [value, setvalue] = useState(false);
  const [error, seterror] = useState(false);

  const handledummy = () => {
    async function fetchdata() {
      try {
        const getpost = await fetch("http://localhost:3000/Incoming");
        const data = await getpost.json();
        setlist(data);
      } catch (error) {
        alert("Not able to fetch");
      }
    }

    fetchdata();
  };

  const handleClick = () => {
    setvalue(true);
  };

  useEffect(() => {
    async function fetchdata() {
      try {
        const token = localStorage.getItem("token");
        const getpost = await fetch("http://localhost:3000/Incoming", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await getpost.json();
        setlist(data);
        console.log(data);
      } catch (error) {
        seterror(true);
      }
    }
    fetchdata();
  }, []);

  return (
    <div className="Body">
      <Navbar />
      <div className="but">
        <button className="Add" onClick={handleClick}>
          + Add Employee
        </button>
        <button className="Add" onClick={handledummy}>
          {" "}
          See All Employee
        </button>
      </div>
      <br></br>
      <div className="table">
        <div className="row">
          <div className="cell header">Name</div>
          <div className="cell header">age</div>
          <div className="cell header">City</div>
          <div className="cell header">Action</div>
        </div>
        {list.map((item, index) => {
          return <List res={item} key={index} Show={() => handledummy()} />;
        })}
      </div>
      {value && <Add item={() => setvalue(false)} />}

      {error && <Pok onClose={() => seterror(false)} />}
    </div>
  );
};

export default Body;
