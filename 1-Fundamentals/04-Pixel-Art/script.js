const pixelBoardId = document.getElementById('pixel-board');

// function to creat board;
const buttonGenerateBoard = document.querySelector('#generate-board');
const pixelBoardSizeChange = document.querySelector('#pixel-board');

//  creat a default size function > 5 and < 50;
function minAndMaxStandard(size) {
  if (size.value < 5) size.value = 5;
  else if (size.value > 50) size.value = 50;
  return size.value;
}

//  Random color generator
function randomColorSelect() {
  // let r = (Math.random()*255|0).toString(16).slice(-2);
  // let g = (Math.random()*255|0).toString(16).slice(-2);
  // let b = (Math.random()*255|0).toString(16).slice(-2);
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`
}

//  Calculate the board ^2, and applying to the width;
function calculateBoardSquare(size) {
  const boardWidth = (size * 40);
  pixelBoardSizeChange.style.width = `${boardWidth}px`;
}

function addDivLines(sizeBoard, classOfPixels) {
  for (let index = 0; index < sizeBoard; index += 1) {
    const a = pixelBoardId.appendChild(document.createElement('div'));
    a.className = classOfPixels;
  }
}

//  Making a default size of 5x5;
const defaultSize = 25;
addDivLines(defaultSize, 'pixel');

function removeOldBoard() {
  const removeBoard = document.querySelectorAll('.pixel');
  for (let index = 0; index < removeBoard.length; index += 1) {
    removeBoard[index].remove();
  }
}

buttonGenerateBoard.addEventListener('click', () => {
  const boardSizeButton = document.querySelector('#board-size');
  const a = boardSizeButton.value;
  if (a < 1 || a > 50) {
    window.alert('Board inválido!');
    minAndMaxStandard(boardSizeButton);
    const size = minAndMaxStandard(boardSizeButton);
    calculateBoardSquare(size);
    removeOldBoard();
    const boardSquare = size * size;
    addDivLines(boardSquare, 'pixel');
  } else {
    const size = minAndMaxStandard(boardSizeButton);
    calculateBoardSquare(size);
    removeOldBoard();
    const boardSquare = size * size;
    addDivLines(boardSquare, 'pixel');
  }
});

document.getElementById('color1').style.backgroundColor = 'rgb(0 , 0 , 0)';
document.getElementById('color2').style.backgroundColor = randomColorSelect();
document.getElementById('color3').style.backgroundColor = randomColorSelect();
document.getElementById('color4').style.backgroundColor = randomColorSelect();

// change color when selected in pallet;
const colorPalletId = document.getElementById('color-palette');

function colorChange(event) {
  const selectedClassElement = document.getElementsByClassName('color');
  const selectClassColorAndSelected = document.getElementsByClassName('color selected');
  const colorTarget = event.target;

  if (event.target.tagName === 'DIV') {
    for (let index = 0; index < selectedClassElement.length; index += 1) {
      selectedClassElement[index].classList.remove('selected');
      if (colorTarget !== selectClassColorAndSelected) {
        colorTarget.className = 'color selected';
      }
    }
  }
}

colorPalletId.addEventListener('click', colorChange);

//  add a color to the pixel board;
function inputColor(event) {
  if (event.target.tagName === 'DIV') {
    const selectedClassColor = document.querySelector('.selected').style.backgroundColor;
    event.target.style.backgroundColor = selectedClassColor;
  }
  // if (event.target !== colorPixelAdd) {
  //   selectedClassColor.remove = colorPixelAdd;
  //   event.target.id = selectedClassColor;
  // }
}

// button to remove all colors;
pixelBoardId.addEventListener('click', inputColor);
const clearButton = document.getElementById('clear-board');

function clearBoardClick() {
  const pixelBoard = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixelBoard.length; index += 1) {
    pixelBoard[index].style.backgroundColor = '';
  }
}

clearButton.addEventListener('click', clearBoardClick);
