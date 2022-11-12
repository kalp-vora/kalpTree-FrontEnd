import SessionStorage from "../contexts/SessionStorage";
import BlogServices from "../service/BlogServices";

const BlogMiddleware = {
  addBlog: (blog, onSuccess = () => {}, onError = () => {}) => {
    const { userId } = SessionStorage.getUserSession();

    const newBlog = {
      title: blog.title,
      content: blog.content,
      writtenDateTime: blog.writtenDateTime,
      publishDateTime: blog.publishDateTime,
      penName: blog.penName,
      isPublished: blog.isPublished,
      likeCount: blog.likeCount,
      funnyCount: blog.funnyCount,
      insightfulCount: blog.insightfulCount,
      category: { categoryId: blog.category },
      user: { userId: userId },
    };

    BlogServices.addBlog(newBlog)
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

export default BlogMiddleware;
