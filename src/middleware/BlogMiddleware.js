const BlogMiddleware = {
  addBlog: (blog, onSuccess = () => {}, onError = () => {}) => {
    console.log(blog);
  },
};

export default BlogMiddleware;
