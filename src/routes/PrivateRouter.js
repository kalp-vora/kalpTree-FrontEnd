import { useEffect } from "react";
import { useNavigate } from "react-router";
import SessionStorage from "../contexts/SessionStorage";

const PrivateRoute = ({ children }) => {
  const { authenticated } = SessionStorage.getUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      SessionStorage.clearUserSession();
      navigate("/login");
    }
  }, [authenticated, navigate]);

  return authenticated && children;
};

export default PrivateRoute;
