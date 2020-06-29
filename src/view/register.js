import { newUser, verifEmail } from '../model/firebase.js';
import { updateUser } from '../model/firebase_wall.js';

const showMessage = (txtmessage) => {
  const showWindow = document.createElement('div');
  showWindow.classList.add('showWindow');
  showWindow.textContent = txtmessage;
  document.body.appendChild(showWindow);
  setTimeout(() => {
    document.body.removeChild(showWindow);
  }, 4000);
};

const registerUser = (userEmail, userPass, userNames) => {
  // const spanMessage = document.body.querySelector('#messages');
  newUser(userEmail, userPass)
    .then((result) => {
      showMessage(`⚠️ ${userNames}, enviamos un correo para activar su cuenta.`);
      // spanMessage.innerHTML = `⚠️ ${userNames}, enviamos un correo para activar su cuenta.`;
      verifEmail()
        .then(() => {
        // Verification email sent.
        })
        .catch((error) => {
          // error firebase por "sendEmailVerification()"
          showMessage(error.code);
          // spanMessage.innerHTML = error.code;
        // Error occurred. Inspect error.code.
        });
      // guardar nombre del usuario en coleccion users
      updateUser(result.user.uid, userNames, '');
    })
    .catch(() => {
      // error firebase por "createUserWithEmailAndPassword()", especificar a futuro.
      showMessage('⚠️Error al auntenticar usuario, verifique cuenta, clave o INICIE SESION, gracias.');
      // spanMessage.innerHTML = 'Error al auntenticar usuario, intentelo nuevamente, gracias.';
    });
  firebase.auth().signOut()
    .then(() => {
      console.log('cerro sesion');
    })
    .catch((error) => {
      console.log(error.code);
    });
};

export default () => {
  const viewRegister = `
  <img class="logo" src="img/logo.png">
  <p id='texto'>¿Qué esperas para unirte? Somos la comunidad de baile más grande de internet. Aprende, comparte y disfruta en MOVES.</p>
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>CREA TU CUENTA</p>
  <div><i class="far fa-user"></i><input type="text" id ="names" placeholder ="Nombres y Apellidos"></div>
  <div><i class="fas fa-at"></i><input type="text" id = "email" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input type="password" id = "pass" placeholder="Contraseña"></div>
  <button type="button" id="btn-register" class='principal-button'>REGISTRATE</button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>¿Ya tienes una cuenta?</p><a id='just-link'href="">Inicia Sesión</a>
  </div>
`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewRegister;

  const btnNewUser = divElemt.querySelector('#btn-register');
  btnNewUser.addEventListener(('click'), () => {
    const userNames = divElemt.querySelector('#names').value;
    const userEmail = divElemt.querySelector('#email').value;
    const userPass = divElemt.querySelector('#pass').value;
    if (userNames === '') {
      showMessage('⚠️ Por favor ingrese su nombre');
      // divElemt.querySelector('#messages').innerHTML = '⚠️ Por favor ingrese su nombre';
    } else if (userEmail === '') {
      showMessage('⚠️ Por favor ingrese un correo electronico');
    } else if (userPass === '') {
      showMessage('⚠️ Por favor ingrese su contraseña');
      // divElemt.querySelector('#messages').innerHTML = '⚠️ Por favor ingrese su contraseña';
    } else {
      registerUser(userEmail, userPass, userNames);
    }
  });
  return divElemt;
};
