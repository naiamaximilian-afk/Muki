const form = document.querySelector('#fit');
const piece = document.querySelector('#piece');
const fields = document.querySelector('#measurements');
const summary = document.querySelector('#summary');
const shirtColor = document.querySelector('#shirt-color');
const trouserColor = document.querySelector('#trouser-color');
const shirtSwatch = document.querySelector('#shirt-swatch');
const trouserSwatch = document.querySelector('#trouser-swatch');
const menu = document.querySelector('.menu');

const measures = {
  shirt: ['Bröst', 'Midja', 'Axelbredd', 'Ärmlängd'],
  trousers: ['Midja', 'Höft', 'Innerbenslängd'],
};

const colors = {
  navy: '#1e253a',
  black: '#161616',
  ivory: '#ece5d5',
  champagne: '#d5bea3',
  charcoal: '#3b3a3d',
  stone: '#aca39a',
};

function renderMeasurements() {
  fields.replaceChildren();
  summary.textContent = '';
  for (const name of measures[piece.value]) {
    const label = document.createElement('label');
    label.textContent = name + ' (cm)';
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '250';
    input.step = '0.5';
    input.required = true;
    input.name = name;
    label.append(input);
    fields.append(label);
  }
}

function renderColors() {
  shirtSwatch.style.backgroundColor = colors[shirtColor.value];
  trouserSwatch.style.backgroundColor = colors[trouserColor.value];
  summary.textContent = '';
}

piece.addEventListener('change', renderMeasurements);
shirtColor.addEventListener('change', renderColors);
trouserColor.addEventListener('change', renderColors);
fields.addEventListener('input', () => { summary.textContent = ''; });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.querySelectorAll('[data-piece]').forEach(link => link.addEventListener('click', () => {
  if (piece.value === link.dataset.piece) return;
  piece.value = link.dataset.piece;
  renderMeasurements();
}));
document.querySelectorAll('[data-look]').forEach(link => link.addEventListener('click', () => {
  const [shirt, trousers] = link.dataset.look.split('/');
  shirtColor.value = shirt;
  trouserColor.value = trousers;
  renderColors();
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  summary.textContent = [
    piece.selectedOptions[0].textContent,
    'Skjorta: ' + shirtColor.selectedOptions[0].textContent,
    'Byxor: ' + trouserColor.selectedOptions[0].textContent,
    ...[...fields.querySelectorAll('input')].map(input => input.name + ': ' + input.value + ' cm'),
  ].join('\n');
});

renderMeasurements();
renderColors();

