//  dynamic page creation;
const h1 = document.createElement('h1');

document.querySelector('header').appendChild(h1);

const divFunction = document.body.children[1];

divFunction.setAttribute('id', 'funcionamento');

const inputSelect = document.querySelector('input');

inputSelect.setAttribute('id', 'texto-tarefa');

const olSelect = document.querySelector('ol');

const funcId = document.getElementById('funcionamento');

const buttonSelect = document.querySelector('button');

h1.innerText = 'Minha Lista de Tarefas';

funcId.innerText = 'Clique duas vezes em um item para marcá-lo como completo';

olSelect.setAttribute('id', 'lista-tarefas');

buttonSelect.setAttribute('id', 'criar-tarefa');

const classListaTarefas = document.querySelector('#lista-tarefas');

//  Create a new li whit value of the text box;
buttonSelect.addEventListener('click', () => {
  const liCreat = document.createElement('li');
  const input = document.querySelector('input').value;
  classListaTarefas.appendChild(liCreat).innerText = input;
  document.querySelector('input').value = '';
});

//  function, to add or remove class .taskSelected;
function unselectClass(event) {
  const taskId = document.getElementsByClassName('taskSelected');
  if (taskId !== []) {
    for (let index = 0; index < taskId.length; index += 1) {
      taskId[index].classList.remove('taskSelected');
    }
  }
  event.target.classList.add('taskSelected');
}

//  event, comparing if the click will only work at li`s;
classListaTarefas.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    unselectClass(event);
  }
});

classListaTarefas.addEventListener('dblclick', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
  // refactoring code;
  // const selectCompleted = event.target.classList.value;
  // if (selectCompleted === 'taskSelected') {
  //   event.target.classList.add('completed');
  // } else {
  //   event.target.classList.remove('completed');
  // }
});

//  add a dynamic button;
const deleteButton = document.getElementsByTagName('button')[1];
deleteButton.setAttribute('id', 'apaga-tudo');
deleteButton.innerHTML = 'Apagar';

//  event to delete all ol content;
deleteButton.addEventListener('click', () => {
  const liCount = document.querySelector('ol');
  liCount.innerHTML = '';
});

//  add a dynamic button;
const throughDeleteButton = document.getElementsByTagName('button')[2];
throughDeleteButton.setAttribute('id', 'remover-finalizados');
throughDeleteButton.innerHTML = 'Apagar Tarefas Finalizadas';

//  event to remove line-through tasks;
throughDeleteButton.addEventListener('click', () => {
  const completedClassSelect = document.querySelectorAll('.completed');
  console.log(completedClassSelect);
  for (let index = 0; index < completedClassSelect.length; index += 1) {
    completedClassSelect[index].remove();
  }
});

//  add a dynamic button;
const saveLocalButton = document.getElementsByTagName('button')[3];
saveLocalButton.setAttribute('id', 'salvar-tarefas');
saveLocalButton.innerHTML = 'Save tasks';

//  save in local storage;
saveLocalButton.addEventListener('click', () => {
  localStorage.setItem('tasks', classListaTarefas.innerHTML);
});

const importList = localStorage.getItem('tasks');

if (importList) {
  classListaTarefas.innerHTML = importList;
}

//  add a dynamic button;
const moveTaskUPButton = document.getElementsByTagName('button')[4];
moveTaskUPButton.setAttribute('id', 'mover-cima');
moveTaskUPButton.innerHTML = 'move-up';

//  add a dynamic button;
const moveTaskDownButton = document.getElementsByTagName('button')[5];
moveTaskDownButton.setAttribute('id', 'mover-baixo');
moveTaskDownButton.innerHTML = 'move-down';

//  function to move selected li up
function moveUp(selectedClass) {
  const nextElement = selectedClass.previousElementSibling;
  if (nextElement !== null) {
    selectedClass.insertAdjacentElement('afterend', nextElement);
  }
}

//  checking if there is a li selected
moveTaskUPButton.addEventListener('click', () => {
  const selectedClass = document.querySelector('.taskSelected');
  if (selectedClass !== null) {
    moveUp(selectedClass);
  }
});

function moveDown(selectedClass) {
  const nextElement = selectedClass.nextElementSibling;
  if (nextElement !== null) {
    selectedClass.insertAdjacentElement('beforebegin', nextElement);
  }
}

moveTaskDownButton.addEventListener('click', () => {
  const selectedClass = document.querySelector('.taskSelected');
  if (selectedClass !== null) {
    moveDown(selectedClass);
  }
});

//  add a dynamic button;
const removeSelectedButton = document.getElementsByTagName('button')[6];
removeSelectedButton.setAttribute('id', 'remover-selecionado');
removeSelectedButton.innerHTML = 'remove selected';

//  remove selected task
removeSelectedButton.addEventListener('click', () => {
  const selectedClass = document.querySelector('.taskSelected');
  if (selectedClass !== null) {
    selectedClass.remove();
  }
});
