export const generateTree = (raw) => {
  const data = raw
    .reduce((acc, curr) => {
      curr.children = raw.filter((i) => i.parent?._id == curr._id);
      acc.push(curr);

      return acc;
    }, [])
    .filter((i) => i.parent?._id == null);

  return data;
};

export const addPrefix = (arr, depth = 0) => {
  return arr.map((node) => {
    if (depth) node.title = "- ".repeat(depth) + node.title;

    if (node.children) node.children = addPrefix(node.children, depth + 1);

    return node;
  });
};

export const generateTreeArray = (raw) => {
  let data = [];

  for (let i in raw) {
    data.push(raw[i]);

    if (raw[i].children) data = [...data, ...generateTreeArray(raw[i].children)];
  }
  return data;
};

export const generateSelectArray = (arr) => {
  return arr.map(({ _id, title }) => {
    return {
      value: _id,
      title: title,
    };
  });
};
