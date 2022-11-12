import axios from "axios";
import SessionStorage from "../contexts/SessionStorage";

const baseURL = "http://localhost:8080/api";

const AxiosInstance = () => {
  const { token } = SessionStorage.getUserSession();
  const authHeader = token ? `Bearer ${token}` : "";
  const client = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: authHeader,
    },
  });

  return client;
};

export default AxiosInstance;
