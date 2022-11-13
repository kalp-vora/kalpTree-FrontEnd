import React, { useEffect, useState } from "react";
import BlogMiddleware from "../../middleware/BlogMiddleware";

const Workspace = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    BlogMiddleware.getBlogById(
      ({ data }) => {
        console.log(data);
        setBlogs(data.data);
      },
      ({ response }) => {
        console.log(response);
      }
    );
  }, []);

  return (
    <>
      {blogs.map((blog) => {
        return (
          <div key={blog.blogId}>
            <h2>Title: {blog.title}</h2>
            <p>Content: {blog.content}</p>
            <p>Author: {blog.penName}</p>
            <p>Likes: {blog.likeCount}</p>
            <p>Funny: {blog.funnyCount}</p>
            <p>Insightful: {blog.insightfulCount}</p>
            <p>Category: {blog.categoryName}</p>
            <p>Written on: {blog.writtenDateTime}</p>
            <p>
              Published on:{" "}
              {blog.publishedDateTime
                ? blog.publishedDateTime
                : "NOT PUBLISHED"}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Workspace;
