import { useState } from "react";

const Update = ({ down, prop }) => {
  const [data, setdata] = useState({
    name: "",
    age: "",
    city: "",
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const send = await fetch(`http://localhost:3000/Incoming/${prop.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Updated Sucessfully");
      down();
    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <div className="modal">
      <div className="box">
        <button className="cross" onClick={() => down()}>
          ✖
        </button>

        <div className="list">
          <div>
            <label>Name</label>
            <br></br>
            <br></br>
            <input
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label>age</label>
            <br></br>
            <br></br>
            <input
              name="age"
              placeholder="age"
              value={data.age}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label>city</label>
            <br></br>
            <br></br>
            <input
              name="city"
              placeholder="city"
              value={data.city}
              onChange={handleChange}
            ></input>
          </div>
          <button className="submit" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
