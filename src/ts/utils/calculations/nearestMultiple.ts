const nearestMultiple = (num: number, multiple: number): number => {
  return Math.ceil(num / multiple) * multiple;
};

export default nearestMultiple;
