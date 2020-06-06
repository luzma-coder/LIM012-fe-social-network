// import { viewRegister } from './controller/router.js';
import { components } from '../view/index.js';

// Funcion para cambio de la url, asociado a las opciones register, etc
// eslint-disable-next-line consistent-return
const changeView = (hash) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '#/':
      container.appendChild(components.hom());
      break;
    case '#/register':
    // case '#/register':
    // case '#/register':
      container.appendChild(components.regis());
      break;
    default:
      container.appendChild(components.different());
  }
};
export { changeView };
