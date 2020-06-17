import { components } from '../view/index.js';

// Funcion para cambio de la url, asociado a las opciones register, etc
const changeView = (hash) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '':
    case '/':
    case '#':
    case '#/':
      container.appendChild(components.hom());
      break;
    case '#/register':
      container.appendChild(components.regis());
      break;
    case '#/wall': {
      // la idea es que aqui se muestre el header
      // const cab = document.querySelector('header');
      // cab.classList.add('show');
      container.appendChild(components.wal());
    }
      break;
    default:
      container.appendChild(components.different());
  }
};
export { changeView };
