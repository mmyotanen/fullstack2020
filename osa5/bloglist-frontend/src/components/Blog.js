import React, { useState } from "react";

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [allInfo, toggleAllInfo] = useState(false);

  const like = (event) => {
    addLike({ blog });
  };

  if (allInfo === true) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}{" "}
        <button onClick={() => toggleAllInfo(!allInfo)}> hide </button>
        <br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={like}> like </button>
        <br />
        {blog.user.username}
        <br />
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}{" "}
        <button onClick={() => toggleAllInfo(!allInfo)}> view </button>
      </div>
    );
  }
};

export default Blog;
