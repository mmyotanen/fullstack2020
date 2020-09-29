import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("only blog title and author", () => {
  const blog = {
    title: "Testi",
    author: "Miika",
    url: "mooc.fi",
    likes: 69,
    user: {
      name: "Pena",
    },
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("Testi");
  expect(component.container).toHaveTextContent("Miika");
  expect(component.container).not.toHaveTextContent("mooc.fi");
  expect(component.container).not.toHaveTextContent("69");
});

test("url and likes after view button is clicked", () => {
  const blog = {
    title: "Testi",
    author: "Miika",
    url: "mooc.fi",
    likes: 69,
    user: {
      name: "Pena",
    },
  };

  const component = render(<Blog blog={blog} />);
  const button = component.getByText("view");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("mooc.fi");
  expect(component.container).toHaveTextContent("69");
});

test("clicking like button twice calls the handler twice", () => {
  const blog = {
    title: "Testi",
    author: "Miika",
    url: "mooc.fi",
    likes: 69,
    user: {
      name: "Pena",
    },
  };

  const mockLike = jest.fn();
  const { getByText } = render(<Blog blog={blog} addLike={mockLike} />);

  fireEvent.click(getByText("view"));
  fireEvent.click(getByText("like"));
  fireEvent.click(getByText("like"));
  expect(mockLike.mock.calls.length).toBe(2);
});
