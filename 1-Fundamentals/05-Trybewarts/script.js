const buttonLogin = document.getElementById('btnLogin');

//  Confirms if the login and password is confirmed;
function loginConfirmation() {
  const loginId = document.getElementById('loginEmail').value;
  const passwordId = document.getElementById('loginPassword').value;
  if (loginId === 'tryber@teste.com' && passwordId === '123456') {
    alert('Olá, Tryber!');
  } else alert('Login ou senha inválidos.');
}

buttonLogin.addEventListener('click', loginConfirmation);

const buttonSubmit = document.getElementById('submit-btn');

const checkedBox = document.getElementById('agreement');

//  enable button after check the agreement box;
function submitInfo() {
  if (checkedBox.checked === true) {
    buttonSubmit.disabled = false;
  } else buttonSubmit.disabled = true;
}

checkedBox.addEventListener('click', submitInfo);
// const evaluationClass = document.querySelector('.evaluation');
// function addInput() {
//   for (let index = 1; index < 11; index += 1) {
//     const inputCreation = document.createElement('input');
//     const labelCreation = document.createElement('label');
//     labelCreation.setAttribute('for', index);
//     labelCreation.innerText = index;
//     inputCreation.setAttribute('id', ''index);
//     inputCreation.setAttribute('type', 'radio');
//     inputCreation.setAttribute('name', 'name');
//     inputCreation.innerText = index;
//     evaluationClass.appendChild(inputCreation);
//     evaluationClass.appendChild(labelCreation);
//   }
// }
// addInput();

const countLabel = document.querySelector('#counter');

const textArea = document.querySelector('textarea');

textArea.addEventListener('input', () => {
  const size = document.querySelector('textarea').maxLength;
  const numberOfCharacters = document.querySelector('textarea').value.length;
  countLabel.innerText = size - numberOfCharacters;
});

function learningValuesCall() {
  const contentValue = document.querySelectorAll('input[name="content"]:checked');
  const learn = [];
  for (let index = 0; index < contentValue.length; index += 1) {
    learn.push(contentValue[index].value);
  } return learn.join(', ');
}

function inputsValues(valueInput) {
  const newLabel = document.createElement('div');
  newLabel.innerText = valueInput;
  return newLabel;
}

buttonSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  const nameValue = document.getElementById('input-name').value;
  const lastNameValue = document.getElementById('input-lastname').value;
  const emailValue = document.getElementById('input-email').value;
  const houseValue = document.getElementById('house').value;
  const familyValue = document.querySelector('input[name="family"]:checked').value;
  const learningValue = learningValuesCall();
  const evaluationValue = document.querySelector('input[name="rate"]:checked').value;
  const observationValue = document.getElementById('textarea').value;
  const formId = document.getElementById('evaluation-form');
  formId.innerHTML = '';
  formId.appendChild(inputsValues(`Nome: ${nameValue} ${lastNameValue}`));
  formId.appendChild(inputsValues(`Email: ${emailValue}`));
  formId.appendChild(inputsValues(`Casa: ${houseValue}`));
  formId.appendChild(inputsValues(`Família: ${familyValue}`));
  formId.appendChild(inputsValues(`Matérias: ${learningValue}`));
  formId.appendChild(inputsValues(`Avaliação: ${evaluationValue}`));
  formId.appendChild(inputsValues(`Observações: ${observationValue}`));
});
