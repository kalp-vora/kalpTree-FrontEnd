import AuthServices from "../service/AuthServices";

const AuthMiddleware = {
  login: (user, onSuccess = () => {}, onError = () => {}) => {
    AuthServices.login(user)
      .then((data) => {
        console.log(data);
        onSuccess(data);
      })
      .catch((error) => {
        console.log(error);
        onError(error);
      });
  },
};

export default AuthMiddleware;
