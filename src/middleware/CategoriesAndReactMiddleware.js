import CategoriesAndReactServices from "../service/CategoriesAndReactServices";

const CategoriesAndReactMiddleware = {
  getAllCategories: (onSuccess = () => {}, onError = () => {}) => {
    CategoriesAndReactServices.getAllCategories()
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
export default CategoriesAndReactMiddleware;
