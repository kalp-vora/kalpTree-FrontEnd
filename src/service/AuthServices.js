import AxiosInstance from "../utils/AxiosInstance";

const AuthServices = {
  login: (user) => {
    return AxiosInstance().post(`/login`, { ...user });
  },
};

export default AuthServices;
