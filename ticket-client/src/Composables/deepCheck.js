//只接受children為 object || string 的結構!
export const deepCheck = (obj, s) => {
  // console.log('---deep',obj,s, obj===s,typeof obj === "object", Object.values(obj).every((x) => deepCheck(x, s)));
  if (typeof obj === "object")
    return Object.values(obj).every((x) => deepCheck(x, s));
  else return obj === s;
};
