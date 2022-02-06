// Desafio 10
function techFor(t, n) {
  t.sort();
  let ar = [];
  for (let i = 0; i < t.length; i += 1) {
    let obj = {};
    obj.tech = t[i];
    obj.name = n;
    ar.push(obj);
  }
  return ar;
}
function techList(t, n) {
  if (t.length === 0) {
    return 'Vazio!';
  }
  return techFor(t, n);
}

// Desafio 11
function numberError(arrayError) {
  if (arrayError.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  for (let i = 0; i < arrayError.length; i += 1) {
    let count = arrayError.filter((n) => n === arrayError[i]).length;
    if (arrayError[i] < 0 || arrayError[i] > 9 || count > 2) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return true;
}

function generatePhoneNumber(pNumber) {
  if (numberError(pNumber) === true) {
    let num = [];
    for (let i = 0; i < pNumber.length; i += 1) {
      num.push(pNumber[i]);
    }
    let a = `(${num[0]}${num[1]}) ${num[2]}${num[3]}${num[4]}${num[5]}${num[6]}`;
    let b = `-${num[7]}${num[8]}${num[9]}${num[10]}`;
    return a + b;
  }
  return numberError(pNumber);
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let a = Math.abs(lineA);
  let b = Math.abs(lineB);
  let c = Math.abs(lineC);
}

// Desafio 13
function numberOfString(s) {
  return s.match(/\d+/g);
}
function counting(b) {
  let count = 0;
  for (let element of b) {
    let int = parseInt(element);
    count += int;
  }
  return count;
}
function hydrate(string) {
  let number = numberOfString(string);
  let count = counting(number);
  if (count > 1) {
    return `${count} copos de água`;
  }
  return `${count} copo de água`;
}
// Desafio 13 /\d+/g busca de digito e global reference https://stackoverflow.com/questions/10003683/how-can-i-extract-a-number-from-a-string-in-javascript
module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
