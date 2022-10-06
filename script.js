const captColorPalette = document.getElementById('color-palette');
const captBtn = document.getElementById('button-random-color');
const captBoard = document.getElementById('pixel-board');
const captBtnClear = document.getElementById('clear-board');

function FunColorPalette() {
  captColorPalette.style.display = 'flex';

  for (let i = 0; i < 4; i += 1) {
    const createColors = document.createElement('div');
    createColors.className = 'color';
    createColors.id = `${i}`;
    createColors.style.border = '1px solid black';
    createColors.style.width = '40px';
    createColors.style.height = '40px';
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

function creteDivs(size) {
  captBoard.style.border = '1px solid black';
  captBoard.style.width = '210px';
  captBoard.style.height = '210px';
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

  for (let i = 0; i < captPixels.length; i += 1) {
    let captId = document.getElementById(`pixel${i}`);
    captId.style.backgroundColor = savedPixel['pixel' + i];
  }
}

FunColorPalette();
paint();
btnRandom();
genereteColor();
creteDivs(25);
selectedColor();
paintPixels();
btnClear();
savePixels();
recoverPixels();
