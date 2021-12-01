export const getSold = (options, option, title, fake) => {
  return fake
    ? options[option]["sold"] +
        (title ? title.length : 0) +
        parseInt(options[option]["thumbnail"].length % 20)
    : options[option]["sold"];
};

export const getAllSold = (options, title) => {
  let all = 0;
  for (let key in options) {
    all += getSold(options, key, title, false);
  }

  return all;
};
