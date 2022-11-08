// MUI IMPORTS
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// REACT IMPORTS
import React, { useContext, useState } from "react";

// PERSONAL IMPORTS
import Roles from "../utils/Roles";
import Regex from "../utils/Regex";
import errorMessages from "../utils/Messages";
import UserMiddleware from "../middleware/UserMiddleware";
import { useNavigate } from "react-router";
import Status from "../utils/Status";
import { GlobalContext } from "../contexts/GlobalContext";
import ActionTypes from "../utils/ActionTypes";

const Register = () => {
  const { authDispatch } = useContext(GlobalContext);

  // INITIAL STATE
  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    contact: "",
    dateOfBirth: new Date(),
    role: Roles.USER,
  };

  // INITIAL ERROR STATE
  let initialErrorState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    contact: false,
  };

  const [user, setUser] = useState(initialState);
  const [isError, setIsError] = useState(initialErrorState);

  const navigateToLogin = () => {
    navigate("/login");
  };

  // VALIDATE USER INPUTS
  const validate = () => {
    let isValid = false;
    if (!Regex.NAME.test(user.firstName)) {
      setIsError({ ...initialErrorState, firstName: true });
    } else if (!Regex.NAME.test(user.lastName)) {
      setIsError({ ...initialErrorState, lastName: true });
    } else if (!Regex.EMAIL.test(user.email)) {
      setIsError({ ...initialErrorState, email: true });
    } else if (!Regex.CONTACT.test(user.contact)) {
      setIsError({ ...initialErrorState, contact: true });
    } else if (!(user.password === user.confirmPassword)) {
      setIsError({ ...initialErrorState, password: true });
    } else {
      isValid = true;
    }
    return isValid;
  };

  // HANDLE CHANGE
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // HANDLE CLEAR BUTTON
  const handleClear = () => {
    setUser(initialState);
    setIsError(initialErrorState);
  };

  const navigate = useNavigate();

  // HANDLE SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      // CALLING MIDDLEWARE (DATA, ONSUCCESS, ONERROR)
      UserMiddleware.register(
        user,
        ({ data, status }) => {
          console.log(status);
          console.log(data.message);
          console.log(data.data);
          const registeredUser = data.data;
          if (parseInt(status) === Status.CREATED) {
            // DISPATCHING USER ID
            authDispatch({
              type: ActionTypes.SET_USERID,
              payload: registeredUser.userId,
            });
            // DISPATCHING ROLE
            authDispatch({
              type: ActionTypes.SET_ROLE,
              payload: registeredUser.role,
            });
            // CLEARING STATE AND ERROR
            setUser(initialState);
            setIsError(initialErrorState);

            // NAVIGATE TO LOGIN PAGE
            navigateToLogin();
          }
        },
        ({ response }) => {
          if (parseInt(response.status) === Status.CONFLICT) {
            console.log(response.data.message);
          }
        }
      );
    }
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          onChange={handleChange}
          value={user.firstName}
          required
          error={isError.firstName}
          helperText={isError.firstName && errorMessages.name}
          sx={{ margin: "20px" }}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          value={user.lastName}
          required
          error={isError.lastName}
          helperText={isError.lastName && errorMessages.name}
          sx={{ margin: "20px" }}
        />
        <TextField
          id="email"
          name="email"
          label="Email Address"
          onChange={handleChange}
          value={user.email}
          required
          error={isError.email}
          helperText={isError.email && errorMessages.email}
          sx={{ margin: "20px" }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={user.password}
          required
          error={isError.password}
          helperText={isError.password && errorMessages.password}
          sx={{ margin: "20px" }}
        />

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          value={user.confirmPassword}
          required
          error={isError.password}
          helperText={isError.password && errorMessages.password}
          sx={{ margin: "20px" }}
        />

        <TextField
          id="contact"
          name="contact"
          label="Contact Number"
          type="number"
          onChange={handleChange}
          value={user.contact}
          required
          error={isError.contact}
          helperText={isError.contact && errorMessages.contact}
          sx={{ margin: "20px" }}
        />

        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="gender_label">Gender</InputLabel>
          <Select
            labelId="gender_label"
            label="Gender"
            id="gender"
            name="gender"
            value={user.gender}
            required
            onChange={handleChange}
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"T"}>Transgender</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date Of Birth"
              inputFormat="yyyy/MM/dd"
              value={user.dateOfBirth}
              onChange={(newValue) =>
                setUser({
                  ...user,
                  dateOfBirth: newValue,
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <Button variant="contained" type="submit">
          Submit
        </Button>

        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </form>
    </Container>
  );
};

export default Register;
