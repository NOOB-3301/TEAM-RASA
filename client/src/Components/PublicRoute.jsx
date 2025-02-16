import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = !!authToken;

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
