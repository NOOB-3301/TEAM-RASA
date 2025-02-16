import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Outlet />;
  }

  try {
    const userPayload = jwtDecode(authToken);
    const redirectPath =
      userPayload.role === "student"
        ? "/student"
        : userPayload.role === "teacher"
        ? "/teacher"
        : "/";
    return <Navigate to={redirectPath} />;
  } catch (error) {
    localStorage.removeItem("authToken");
    return <Outlet />;
  }
};

export default PublicRoute;
