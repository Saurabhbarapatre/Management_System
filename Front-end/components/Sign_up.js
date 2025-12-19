import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(Form),
      });
      const data = await res.json();

      if (data.message === "Sucess") {
        localStorage.setItem("token", data.token);
        console.log("Token stored:", localStorage.getItem("token"));
        navigate("/Dashboard");
      } else {
        alert("Invalid User");
      }
    } catch (error) {
      alert("Backend is not Active");
    }
  };

  return (
    <div className="Signup">
      <div className="bck">
        <div className="Child-1">
          <div className="modal-1">
            <div className="Welcome">Welcome Back</div>
            <div className="speach">
              <p>
                A login page is where registered users can securely access their
                account. These pages usually include a username or email field,
                a password field, and a submit button.
              </p>
            </div>
          </div>
        </div>
        <div className="Child-2">
          <div className="modal-2">
            <label className="header-1">Sign Up</label>
            <br></br>
            <br></br>
            <div className="form">
              <label className="Email">Email Address</label>
              <input
                type="text"
                placeholder="email"
                className="text"
                name="email"
                value={Form.email}
                onChange={handleChange}
              />
              <br></br>
              <label className="Email">Password</label>
              <input
                type="password"
                placeholder="password"
                className="text"
                name="password"
                value={Form.password}
                onChange={handleChange}
              />
              <br></br>
              <button className="log" onClick={handleClick}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
