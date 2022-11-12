import AxiosInstance from "../utils/AxiosInstance";

const CategoriesAndReactServices = {
  getAllCategories: () => {
    return AxiosInstance().get(`/admin/category/get/all`);
  },
};
export default CategoriesAndReactServices;
