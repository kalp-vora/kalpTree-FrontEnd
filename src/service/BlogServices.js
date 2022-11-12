import AxiosInstance from "../utils/AxiosInstance";

const BlogServices = {
  addBlog: (blog) => {
    return AxiosInstance().post(`/blog/user/add`, { ...blog });
  },
};

export default BlogServices;
