const createDate = () => {
  const feed = new Date();
  const date = feed.getDate();
  const month = feed.getMonth() + 1;
  const year = feed.getFullYear();
  const feedbackDateString = `${year}-${month}-${date}`;
  return feedbackDateString;
};

export default { createDate };
