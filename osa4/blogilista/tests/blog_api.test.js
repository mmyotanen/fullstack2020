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

afterAll(() => {
  mongoose.connection.close();
});
