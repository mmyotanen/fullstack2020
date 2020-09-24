import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });

    setNewAuthor("");
    setNewUrl("");
    setNewTitle("");
  };

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <input value={newTitle} onChange={handleTitleChange} />
        <input value={newAuthor} onChange={handleAuthorChange} />
        <input value={newUrl} onChange={handleUrlChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
