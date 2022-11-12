import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../contexts/GlobalContext";
import SessionStorage from "../contexts/SessionStorage";

const PrivateRoute = ({ children }) => {
  //   const { authState } = useContext(GlobalContext);
  const { authenticated } = SessionStorage.getUserSession();

  const navigate = useNavigate();
  useEffect(() => {
    // if (!authState.authenticated) {
    //   navigate("/login");
    // }
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  return authenticated && children;
};

export default PrivateRoute;
