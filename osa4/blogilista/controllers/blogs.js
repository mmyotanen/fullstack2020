const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    content: body.content,
    author: body.author,
    url: body.url,
    likes: 55,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog.toJSON());
});

module.exports = blogRouter;
