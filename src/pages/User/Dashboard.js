import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Link to="/user/blog/write">
        <nav>Write a blog</nav>
      </Link>
      <div>DISPLAYS A LIST OF ALL BLOGS TO USER</div>
      <div>DISPLAYS FILTERS FOR DISPLAYING BLOGS</div>
    </>
  );
};

export default Dashboard;
