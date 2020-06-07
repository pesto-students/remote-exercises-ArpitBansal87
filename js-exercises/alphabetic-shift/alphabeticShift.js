const alphabeticShift = (input) => {
  let returnString = '';
  for (let itr = 0; itr < input.length; itr += 1) {
    const currentCharCode = input.charCodeAt(itr);

    if (
      currentCharCode < 65
      || currentCharCode > 122
      || (currentCharCode > 90 && currentCharCode < 97)
    ) {
      returnString += input[itr];
    } else {
      let shiftedCharCode = currentCharCode + 1;

      if (currentCharCode >= 97 && shiftedCharCode > 122) {
        shiftedCharCode = shiftedCharCode - 122 + 96;
      }
      if (currentCharCode <= 90 && shiftedCharCode > 90) {
        shiftedCharCode = shiftedCharCode - 90 + 64;
      }

      returnString += String.fromCharCode(shiftedCharCode);
    }
  }
  return returnString;
};

export { alphabeticShift };
// console.log(alphabeticShift("abc"));
