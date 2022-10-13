const captColorPalette = document.getElementById('color-palette');
const captBtn = document.getElementById('button-random-color');
const captBoard = document.getElementById('pixel-board');
const captBtnClear = document.getElementById('clear-board');
const bSizeInput = document.getElementById('board-size');

function FunColorPalette() {
  captColorPalette.style.padding = '10px';
  captColorPalette.style.display = 'inline-block';

  for (let i = 0; i < 4; i += 1) {
    const createColors = document.createElement('div');
    createColors.className = 'color';
    createColors.id = `${i}`;
    createColors.style.display = 'inline-block';
    createColors.style.border = '1px solid black';
    createColors.style.width = '40px';
    createColors.style.height = '40px';
    createColors.style.marginLeft = '5px';
    createColors.style.borderRadius = '5px';
    if (i === 0) {
      createColors.className += ' selected';
    }
    captColorPalette.appendChild(createColors);
  }
}

function paint() {
  const colorsRandom = {
    save: genereteColor(),
    save2: genereteColor(),
    save3: genereteColor(),
  };

  if (localStorage.getItem('colorPalette') === null) {
    const saveColor = localStorage.setItem(
      'colorPalette',
      JSON.stringify(colorsRandom)
    );
  }
  const recovery = JSON.parse(localStorage.getItem('colorPalette'));

  const captColors = document.querySelectorAll('.color');
  captColors[0].style.backgroundColor = 'black';
  captColors[1].style.backgroundColor = recovery.save;
  captColors[2].style.backgroundColor = recovery.save2;
  captColors[3].style.backgroundColor = recovery.save3;
}

function btnRandom() {
  captBtn.innerHTML = 'Cores aleatórias';
  captBtn.addEventListener('click', function () {
    window.location.reload(localStorage.removeItem('colorPalette'));
  });
}

function genereteColor() {
  let color1 = Math.floor(Math.random() * 256);
  let color2 = Math.floor(Math.random() * 256);
  let color3 = Math.floor(Math.random() * 256);
  let color = `rgb(${color1}, ${color2}, ${color3})`;

  return color;
}

function creteDivs(size, sizeBoard) {
  // captBoard.style.border = '1px solid black';
  captBoard.style.width = `${sizeBoard}px`;
  captBoard.style.height = `${sizeBoard}px`;
  captBoard.style.marginTop = '30px';

  for (let i = 0; i < size; i += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'pixel';
    createDiv.id = `pixel${i}`;
    createDiv.style.backgroundColor = '#fff';
    createDiv.style.width = '40px';
    createDiv.style.height = '40px';
    createDiv.style.border = '1px solid black';
    createDiv.style.display = 'inline-block';
    captBoard.appendChild(createDiv);
  }
}

function selectedColor() {
  captColorPalette.addEventListener('click', function (event) {
    const captId = document.getElementById(event.target.id);

    for (let i = 0; i < 4; i += 1) {
      const captColors = document.querySelectorAll('.color');
      if (captColors[i].id === captId.id) {
        captColors[i].className = `color selected`;
      } else if (captColors[i].id !== captId.id) {
        captColors[i].className = `color`;
      }
    }
  });
}

function paintPixels() {
  captBoard.addEventListener('click', function (event) {
    const captPixels = document.getElementById(event.target.id);
    const captSelect = document.getElementsByClassName('selected')[0];
    captPixels.style.backgroundColor = captSelect.style.backgroundColor;
  });
}

function btnClear() {
  const captPixels = document.querySelectorAll('.pixel');
  captBtnClear.innerHTML = 'Limpar';
  captBtnClear.addEventListener('click', function () {
    for (let i = 0; i < captPixels.length; i += 1) {
      captPixels[i].style.backgroundColor = '#fff';
    }
    localStorage.setItem('pixelBoard', null);
  });
}

function savePixels() {
  let saveBoard = {};

  captBoard.addEventListener('click', function (event) {
    const captIdPixels = event.target.id;
    const captBackgroundC = event.target.style.backgroundColor;

    saveBoard[captIdPixels] = captBackgroundC;

    localStorage.setItem('pixelBoard', JSON.stringify(saveBoard));
  });
}

function recoverPixels() {
  const savedPixel = JSON.parse(localStorage.getItem('pixelBoard'));
  const captPixels = document.querySelectorAll('.pixel');

  if (savedPixel !== null) {
    for (let i = 0; i < captPixels.length; i += 1) {
      let captId = document.getElementById(`pixel${i}`);
      captId.style.backgroundColor = savedPixel[`pixel${i}`];
    }
  }
}

// bonus

const boardSize = () => {
  const captSizeInput = document.getElementById('board-size');
  const captBtnVqv = document.getElementById('generate-board');

  if (captSizeInput.value === '') {
    creteDivs(25, 215);
  }

  captBtnVqv.addEventListener('click', (event) => {
    event.preventDefault();
    const getPixels = document.querySelectorAll('.pixel');
    const valor = Math.abs(captSizeInput.value * captSizeInput.value);
    const valorBoard = Math.abs(captSizeInput.value * 43);

    if (captSizeInput.value >= 5) {
      localStorageBoard(valor);
    }

    if (valor <= 25) {
      for (let i of getPixels) {
        i.remove();
      }
      creteDivs(25, 215);
    } else if (valor > 25 && captSizeInput.value <= 50) {
      captBoard.style.width = `0`;
      for (let i of getPixels) {
        i.remove();
      }
      creteDivs(valor, valorBoard);
    } else if (captSizeInput.value > 50) {
      captBoard.style.width = `0`;
      for (let i of getPixels) {
        i.remove();
      }
      creteDivs(50 * 50, 50 * 42);
    }

    if (captSizeInput.value === '') {
      alert('Board inválido!');
    }
  });
};

const localStorageBoard = (input) => {
  localStorage.setItem('boardSize', JSON.stringify(input));
};

const localSaveBoard = () => {
  const count = localStorage.boardSize;
  const valorBoard = Math.sqrt(count) * 43;
  if (count !== undefined) {
    captBoard.style.width = `0`;
    for (let i of getPixels) {
      i.remove();
    }
    creteDivs(count, valorBoard);
  }
  console.log(count);
};

FunColorPalette();
paint();
btnRandom();
genereteColor();
boardSize(); // ultima criada
selectedColor();
paintPixels();
btnClear();
savePixels();
recoverPixels();
const getPixels = document.querySelectorAll('.pixel');
localSaveBoard();
