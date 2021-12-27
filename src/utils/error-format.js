export const errorFormat = (data, key) => {
  return data.reduce((acc, curr) => {
    return { ...acc, [curr[key]]: { ...curr } };
  }, {});
};
