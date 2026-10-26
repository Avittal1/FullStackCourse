// 1. function which accepts an array of integers and returns a new array with all the values in the array passed to the function doubled. 
function doubleValues(numbers){
	return numbers.map(number => number * 2);
}

//2. function which accepts an array and returns a new array with only the even values in the array passed to the function. 
function onlyEvenValues(numArr){
	return numArr.filter(even => even % 2 === 0);
}

//3. function  which accepts an array as an argument and returns a new array with only the first and last elements from the function’s argument array. The returned array should only contain elements that are strings. 
function showFirstAndLast(arr){
	return arr.filter((value, index) =>
		(index === 0 || index === arr.length - 1) && typeof value === "string"
	);
}

//4. function which accepts a string as an argument. The function should return an object which has the count of the number of vowels that are in the string. The key should be the vowel and the value should be the count. e.g. {a:3, o:2,u:4}. Should not be case-sensitive.
function vowelCount(strArg) {
  const vowels = "aeiou";
  const counts = {};
  
  strArg.toLowerCase().split('').forEach(function(char) {
    if (vowels.includes(char)) {
      if (counts[char]) {
        counts[char]++;
      } else {
        counts[char] = 1;
      }
    }
  });

  return counts;
}

//5. function that takes a string as an argument and will return the whole string capitalized. 
function capitalize(str) {
  let result = "";
  
  str.split('').forEach(function(char) {
    result += char.toUpperCase();
  });

  return result;
}

//6. function that takes a string as an argument and return’s an encoded string with each letter shifted down the alphabet by one.
function shiftLetters(strArg) {
  return strArg.split('').map(function(char) {
    let code = char.charCodeAt(0);
    
    if (char === 'z') return 'a';
    if (char === 'Z') return 'Z';
    
    return String.fromCharCode(code + 1);
  }).join('');
}

//7. function swapCase that takes a string as an argument and returns a string that every other word is capitalized. (you can use the fifth’s exercise's function to keep it dry)
function swapCase(strArg){
    return strArg.split(" ").map((word, index) =>
      index % 2 === 1 ? capitalize(word) : word
    ).join(" ");
}