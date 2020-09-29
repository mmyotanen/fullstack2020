import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> props callback test", () => {
  const createBlog = jest.fn();
  const setNotification = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} setNotification={setNotification} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "TSH" },
  });

  fireEvent.change(author, {
    target: { value: "Tolkien" },
  });

  fireEvent.change(url, {
    target: { value: "www.Tolkien.fi" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls.length).toBe(1);
  expect(createBlog.mock.calls[0][0].title).toBe("TSH");
  expect(createBlog.mock.calls[0][0].author).toBe("Tolkien");
  expect(createBlog.mock.calls[0][0].url).toBe("www.Tolkien.fi");
});
