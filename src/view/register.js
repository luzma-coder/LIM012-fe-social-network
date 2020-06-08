import { newUser, verifEmail } from '../model/firebase.js';

export default () => {
  const viewRegister = `
  <div>
  <h1>CREA TU CUENTA</h1>
  <input type="text" id ="names" placeholder ="Nombres y Apellidos">
  <input type="text" id = "email" placeholder="Correo electronico">
  <input type="text" id = "pass" placeholder="Contraseña">
  <button type="button" id="btn-register"><a href="#/register">registrate</a></button>
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
