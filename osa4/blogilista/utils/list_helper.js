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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
