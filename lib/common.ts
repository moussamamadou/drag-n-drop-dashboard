export const size = function (obj: Object) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export const swap = (list: Array<string>, x: number, y: number) => {
  let z = list[y];
  list[y] = list[x];
  list[x] = z;

  return list;
};
