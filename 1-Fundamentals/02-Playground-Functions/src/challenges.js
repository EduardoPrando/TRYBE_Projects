// exercise 1
function compareTrue(a, b) {
  if (a && b) {
    return true;
  } return false;
}

// exercise 2
function calcArea(base, height) {
  let a = (base * height) / 2;
  return a;
}

// exercise 3
function splitSentence(string) {
  return string.split(' ');
}

// exercise 4
function concatName(array) {
  return `${array[array.length - 1]}, ${array[0]}`;
}

// exercise 5
function footballPoints(wins, ties) {
  return (wins * 3) + ties;
}

// exercise 6
function highestCount(array) {
  let high = array[0];
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (high < array[i]) {
      high = array[i];
    }
  } for (let i of array) {
    if (i === high) {
      count += 1;
    }
  } return count;
}

// exercise 7
function catAndMouse(mouse, cat1, cat2) {
  let a = Math.abs(mouse - cat1);
  let b = Math.abs(mouse - cat2);
  if (a === b) {
    return 'os gatos trombam e o rato foge';
  } if (a > b) {
    return 'cat2';
  } return 'cat1';
}

// exercise 8
function fizzBuzz(array) {
  let string = [];
  for (let i of array) {
    if ((i % 3 === 0) && (i % 5 === 0)) {
      string.push('fizzBuzz');
    } else if (i % 5 === 0) {
      string.push('buzz');
    } else if (i % 3 === 0) {
      string.push('fizz');
    } else {
      string.push('bug!');
    }
  } return string;
}

// exercise 9
// old Code:
// for (let i = 0; i < str.length; i += 1) {
//   if (str[i] === 'a') {
//     code.push(1);
//   } else if (str[i] === 'e') {
//     code.push(2);
//   } else if (str[i] === 'i') {
//     code.push(3);
//   } else if (str[i] === 'o') {
//     code.push(4);
//   } else if (str[i] === 'u') {
//     code.push(5);
//   } else {
//     code.push(str[i]);
//   }
function encode(str) {
  let code = str
    .replace(/a/g, 1)
    .replace(/e/g, 2)
    .replace(/i/g, 3)
    .replace(/o/g, 4)
    .replace(/u/g, 5);
  return code;
}

function decode(str) {
  let code = str
    .replace(/1/g, 'a')
    .replace(/2/g, 'e')
    .replace(/3/g, 'i')
    .replace(/4/g, 'o')
    .replace(/5/g, 'u');
  return code;
}
// old Code:
// function decode(str) {
//   let code = [];
//   for (let i = 0; i < str.length; i += 1) {
//     if (str[i] === '1') {
//       code.push('a');
//     } else if (str[i] === '2') {
//       code.push('e');
//     } else if (str[i] === '3') {
//       code.push('i');
//     } else if (str[i] === '4') {
//       code.push('o');
//     } else if (str[i] === '5') {
//       code.push('u');
//     } else {
//       code.push(str[i]);
//     }
//   } return code.join('');
// }

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
