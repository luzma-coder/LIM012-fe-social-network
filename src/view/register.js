import { newUser, verifEmail } from '../model/firebase.js';

export default () => {
  const viewRegister = `
  <div id='extraEdits'>
  <img class="logo" src="img/logo.png">
  <p class='subtitle'>CREA TU CUENTA</p>
  <div><i class="far fa-user"></i><input type="text" id ="names" placeholder ="Nombres y Apellidos"></div>
  <div><i class="fas fa-at"></i><input type="text" id = "email" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input type="password" id = "pass" placeholder="Contraseña"></div>
  <button type="button" id="btn-register" class='principal-button'><a class='links-on-buttons' href="#/register">REGISTRATE</a></button>
  </div>`;
  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewRegister;

  const btnNewUser = divElemt.querySelector('#btn-register');
  btnNewUser.addEventListener(('click'), () => {
    const names = divElemt.querySelector('#names');
    const email = divElemt.querySelector('#email');
    const pass = divElemt.querySelector('#pass');
    const userNames = names.value;
    const userEmail = email.value;
    const userPass = pass.value;
    alert(`${userNames} ${userEmail} ${userPass}`);
    newUser(userEmail, userPass);
    verifEmail(userEmail);
  });
  return divElemt;
};
