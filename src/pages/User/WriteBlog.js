import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogMiddleware from "../../middleware/BlogMiddleware";
import CategoriesAndReactMiddleware from "../../middleware/CategoriesAndReactMiddleware";

const WriteBlog = () => {
  const initialState = {
    title: "",
    content: "",
    writtenDateTime: new Date(),
    publishDateTime: null,
    penName: "Anonymous",
    isPublished: false,
    likeCount: 0,
    funnyCount: 0,
    insightfulCount: 0,
    category: "",
    user: "",
  };

  // HANDLE CHANGE
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  // HANDLE CLEAR BUTTON
  const handleClear = () => {
    setBlog(initialState);
  };

  const handlePublish = (event, isPublish) => {
    event.preventDefault();
    if (isPublish) {
      setBlog({ ...blog, isPublished: true, publishDateTime: new Date() });
    }
    BlogMiddleware.addBlog(
      blog,
      ({ data }) => {
        console.log(data);
      },
      ({ response }) => {
        console.log(response);
      }
    );
  };

  const [blog, setBlog] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesAndReactMiddleware.getAllCategories(
      ({ data }) => {
        console.log(data.data);
        setCategories(data.data);
      },
      ({ response }) => {
        console.log(response);
      }
    );
  }, []);

  return (
    <Container>
      <form
        onSubmit={(e) => {
          const buttonName = e.nativeEvent.submitter.name;
          if (buttonName === "save") handlePublish(e, false);
          if (buttonName === "publish") handlePublish(e, true);
        }}
      >
        <TextField
          id="title"
          name="title"
          label="Title"
          onChange={handleChange}
          required
          value={blog.title}
          sx={{ margin: "20px" }}
        />
        <br></br>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="category_label">Category</InputLabel>
          <Select
            labelId="category_label"
            label="Category"
            id="category"
            name="category"
            value={blog.category}
            required
            onChange={handleChange}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          id="content"
          name="content"
          label="Content"
          onChange={handleChange}
          required
          multiline
          rows={4}
          value={blog.content}
          sx={{ margin: "20px" }}
        />
        <br></br>
        <TextField
          id="penName"
          name="penName"
          label="Pen Name / Author"
          onChange={handleChange}
          required
          value={blog.penName}
          sx={{ margin: "20px" }}
        />
        <br></br>
        <Button type="submit" name="save">
          Save
        </Button>

        <Button onClick={handleClear}>Clear</Button>

        <Button name="publish" type="submit">
          Publish
        </Button>
      </form>
    </Container>
  );
};

export default WriteBlog;
