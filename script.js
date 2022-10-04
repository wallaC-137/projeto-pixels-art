const captColorPalette = document.getElementById('color-palette');


function FunColorPalette() {
  for (let i = 0; i < 4; i += 1) {
    let createColors = document.createElement('div');
    createColors.className = 'color';
    createColors.style.border = '1px solid black';
    createColors.style.width = '40px';
    createColors.style.height = '40px';
    captColorPalette.appendChild(createColors);
  }
  captColorPalette.style.display = 'flex'

  const captColors = document.querySelectorAll('.color');
  captColors[0].style.backgroundColor = 'black';
  captColors[1].style.backgroundColor = 'blue';
  captColors[2].style.backgroundColor = 'green';
  captColors[3].style.backgroundColor = 'yellow';
}












FunColorPalette();

console.log('tudo ok');
