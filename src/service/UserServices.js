import AxiosInstance from "../utils/AxiosInstance";

const UserServices = {
  register: (user) => {
    return AxiosInstance().post(`/register`, {
      ...user,
    });
  },
};

export default UserServices;
