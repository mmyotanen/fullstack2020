const mostBlogs = require("../utils/list_helper");

describe("most blogs", () => {
  test("when no blogs", () => {
    const emptyBlog = [];

    const result = mostBlogs.mostBlogs(emptyBlog);
    expect(result).toEqual(0);
  });

  test("when one blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    let tulostus = { author: "Edsger W. Dijkstra", blogs: 1 };
    const result = mostBlogs.mostBlogs(listWithOneBlog);
    expect(result).toEqual(tulostus);
  });

  test("when more than one blog", () => {
    const listWithManyBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    let tulostus = { author: "Edsger W. Dijkstra", blogs: 3 };
    const result = mostBlogs.mostBlogs(listWithManyBlogs);
    expect(result).toEqual(tulostus);
  });
});
