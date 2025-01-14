export const sum = (num1) => {
  return (num2) => {
    return num1 + num2;
  };
};

console.log(sum(5)(2)); // 7
