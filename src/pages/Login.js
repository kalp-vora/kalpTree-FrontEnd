import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../contexts/GlobalContext";
import AuthMiddleware from "../middleware/AuthMiddleware";
import ActionTypes from "../utils/ActionTypes";
import errorMessages from "../utils/Messages";
import Regex from "../utils/Regex";
import Status from "../utils/Status";

const Login = () => {
  const { authDispatch } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/user/dashboard");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log("INPUT VALIDATED");
      AuthMiddleware.login(
        { email: email, password: password },
        ({ data, status }) => {
          console.log(status);
          console.log(data.message);
          console.log(data.data);
          const { token, role, userId, email } = data.data;
          if (parseInt(status) === Status.OK) {
            // DISPATCHING ROLE
            authDispatch({
              type: ActionTypes.SET_ROLE,
              payload: role,
            });
            // DISPATRCHING USERID
            authDispatch({
              type: ActionTypes.SET_USERID,
              payload: userId,
            });
            // DISPATCHING TOKEN
            authDispatch({
              type: ActionTypes.SET_TOKEN,
              payload: token,
            });
            // DISPATCHING AUTHENTICATION
            authDispatch({
              type: ActionTypes.SET_AUTHENTICATED,
              payload: true,
            });

            // CLEARING STATE & ERRORS
            setEmail("");
            setPassword("");
            setIsError(false);

            // NAVIGATE TO DASHBOARD
            navigateToDashboard();
          }
        },
        ({ response }) => {
          if (parseInt(response.status) === Status.UNAUTHORISED) {
            console.log(response.data.message);
          }
        }
      );
    }
  };

  // VALIDATE USER INPUTS
  const validate = () => {
    let isValid = false;
    if (!Regex.EMAIL.test(email)) {
      setIsError(true);
    } else {
      isValid = true;
    }
    return isValid;
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <form onSubmit={handleLogin}>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          required
          error={isError}
          helperText={isError && errorMessages.email}
          sx={{ margin: "20px" }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          required
          sx={{ margin: "20px" }}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
