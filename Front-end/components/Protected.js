import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default Protected;
