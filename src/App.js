import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./routes/PrivateRouter";
import WriteBlog from "./pages/User/WriteBlog";
import Workspace from "./pages/User/Workspace";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* PRIVATE ROUTES */}
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/blog/write"
            element={
              <PrivateRoute>
                <WriteBlog />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/workspace"
            element={
              <PrivateRoute>
                <Workspace />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

/*
  TODO: check if storing token, userId, role safe in session storage
*/
export default App;
