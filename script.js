const captColorPalette = document.getElementById('color-palette');
const captBtn = document.getElementById('button-random-color');
const captBoard = document.getElementById('pixel-board');

function FunColorPalette() {
  captColorPalette.style.display = 'flex';

  for (let i = 0; i < 4; i += 1) {
    const createColors = document.createElement('div');
    createColors.className = 'color';
    createColors.style.border = '1px solid black';
    createColors.style.width = '40px';
    createColors.style.height = '40px';
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
  captBoard.style.width = '350px';
  captBoard.style.height = '350px';

  for (let i = 0; i < size; i += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'pixel';
    createDiv.style.backgroundColor = '#fff';
    captBoard.appendChild(createDiv);
  }
}

FunColorPalette();
paint();
btnRandom();
genereteColor();
creteDivs(25);

console.log('tudo ok');
