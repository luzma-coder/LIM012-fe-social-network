import { logIn } from '../model/firebase.js';

const changeHash = (hash) => {
  window.location.hash = hash;
};

export default () => {
  const viewHome = `
  <img class="logo" src="img/logo.png">
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>INICIA SESIÓN</p>
  <div><i class="far fa-user"></i><input id ="email" type="text" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input id ="pass" type="password" placeholder="Contraseña"></div>
  <button id = "btn-login" class='principal-button'><a class='links-on-buttons'>INGRESAR</a></button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>O ingresa con...</p>
  <a class='links-on-buttons' href="#/"><img id="face" src="img/facebook.png"></a>
  <a class='links-on-buttons' href="#/"><img id="gmail" src="img/gmail.png"></a>
  <p class='lil-text'>¿No tienes una cuenta?</p><a id='just-link'href="#/register"> REGISTRATE</a>
  </div>`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewHome;

  const btnLogIn = divElemt.querySelector('#btn-login');
  btnLogIn.addEventListener(('click'), () => {
    const email = divElemt.querySelector('#email');
    const pass = divElemt.querySelector('#pass');
    const logInEmail = email.value;
    const logInPass = pass.value;
    logIn(logInEmail, logInPass)
      .then(() => changeHash('#/wall'))
      .catch(() => { divElemt.querySelector('#messages').innerHTML = '⚠️ Usuario no registrado'; });
  });
  return divElemt;
};
