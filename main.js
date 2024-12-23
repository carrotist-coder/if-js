const palindrome = (string) => {
  const length = string.length;
  for (let i = 0; i < length; i++) {
    if (string[i] !== string[length - i - 1]) {
      return false;
    }
  }
  return true;
};

const min = (a, b) => {
  return a < b ? a : b;
};

const max = (a, b) => {
  if (a < b) {
    return b;
  } else {
    return a;
  }
};

const zero = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i].toString();
    let newNum = '';
    for (let j = 0; j < num.length; j++) {
      if (num[j] === '0') {
        newNum += 'zero';
        continue;
      }
      newNum += num[j];
    }
    newArr.push(newNum);
  }
  return newArr;
};

console.log(palindrome('шалаш')); // true
console.log(palindrome('абрикос')); // false
console.log(min(3, 4)); // 3
console.log(max(3, 4)); // 4
const array = [42, 63, 30, 19, 77, 100, 1, 70, 31, 20];
console.log(zero(array)); // ['42', '63', '3zero', '19', '77', '1zerozero', '1', '7zero', '31', '2zero']
