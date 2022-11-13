import AxiosInstance from "../utils/AxiosInstance";

const BlogServices = {
  addBlog: (blog) => {
    return AxiosInstance().post(`/blog/user/add`, { ...blog });
  },
  getBlogByUserId: (id) => {
    return AxiosInstance().get(`/blog/all/${id}`);
  },
};

export default BlogServices;
