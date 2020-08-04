const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("id is not _id", async () => {
  const response = await api.get("/api/blogs");
  const onkoId = response.body[0];
  expect(onkoId.id).toBeDefined();
});

test("new note can be added using post", async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "post",
    author: "Michael Chan",
    url: "toimii",
    likes: 5,
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(helper.initialBlogs.length + 1);
});

test("likes default to 0", async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "post",
    author: "Michael Chan",
    url: "likes",

    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const likesToZero = response.body[2];
  expect(likesToZero.likes).toBe(0);
});

test("if url and title missing bad request", async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",

    author: "Michael Chan",

    likes: 5,
    __v: 0,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
