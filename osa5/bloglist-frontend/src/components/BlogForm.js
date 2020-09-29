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
      likes: 9,
    });

    setNewAuthor("");
    setNewUrl("");
    setNewTitle("");
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input value={newTitle} onChange={handleTitleChange} />
        </p>
        <p>
          author:
          <input value={newAuthor} onChange={handleAuthorChange} />
        </p>
        <p>
          url:
          <input value={newUrl} onChange={handleUrlChange} />
        </p>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
