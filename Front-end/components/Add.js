import { useState } from "react";

const Add = ({ item }) => {
  const [form, setform] = useState({
    name: "",
    age: "",
    city: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (form) => {
    await fetch("http://localhost:3000/Incoming", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    console.log(form);
    setform({
      name: "",
      age: "",
      city: "",
    });
    item();
    alert("Details Added ✅");
  };

  return (
    <div className="modal">
      <div className="box">
        <button className="cross" onClick={() => item()}>
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
              value={form.name}
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
              value={form.age}
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
              value={form.city}
              onChange={handleChange}
            ></input>
          </div>
          <button className="submit" onClick={() => handleSubmit(form)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
