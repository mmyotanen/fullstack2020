const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0];
  let helper = { ...blogs[0] };

  blogs.map((blog) => {
    if (blog.likes > helper.likes) {
      helper = { ...blog };
    }
  });

  return helper;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;
  let blogienMaara = {};

  let suurin = 0;
  let kirjoittaja = "";

  for (blog of blogs) {
    if (blogienMaara[blog.author]) {
      blogienMaara[blog.author] += 1;
      if (suurin < blogienMaara[blog.author]) {
        suurin = blogienMaara[blog.author];
        kirjoittaja = blog.author;
      }
    } else {
      blogienMaara[blog.author] = 1;
      kirjoittaja = blog.author;
      if (suurin === 0) {
        suurin = blogienMaara[blog.author];
        kirjoittaja = blog.author;
      }
    }
  }

  let tulostus = { author: kirjoittaja, blogs: suurin };
  return tulostus;
};

const mostLikes = (blogs) => {
  return 0;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
