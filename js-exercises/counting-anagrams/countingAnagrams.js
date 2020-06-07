const countingAnagrams = (str) => {
  if (typeof str !== 'string') throw new TypeError();
  const arrayOfString = str
    .split(' ')
    .filter((stringEle) => stringEle.length !== 1)
    .map((ele) => ele.split('').sort().join(''));
  const anagramList = {};
  let anagramCount = 0;
  for (let itr = 0; itr < arrayOfString.length; itr += 1) {
    if (anagramList[arrayOfString[itr]]) anagramList[arrayOfString[itr]] += 1;
    else anagramList[arrayOfString[itr]] = 1;
    if (anagramList[arrayOfString[itr]] === 2) anagramCount += 1;
  }
  return anagramCount;
};

export { countingAnagrams };
