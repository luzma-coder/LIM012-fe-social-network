export default () => {
  const viewHome = `
  <div>
  <img class="logo" src="img/logo.png">
  <img id="dance" src="img/dance.png">
  <p class='subtitle'>INICIA SESIÓN</p>
  <div><i class="far fa-user"></i><input type="text" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input type="text" placeholder="Contraseña"><div>
  <button class='principal-button'><a class='links-on-buttons' href="#/">INGRESAR</a></button>
  <p class='lil-text'>O ingresa con...</p>
  <a class='links-on-buttons' href="#/"><img id="face" src="img/facebook.png"></a>
  <a class='links-on-buttons' href="#/"><img id="gmail" src="img/gmail.png"></a>
  <p class='lil-text'>¿No tienes una cuenta?</p><a id='just-link'href="#/register"> REGISTRATE</a>
  </div>`;
  const divElemt = document.createElement('div');

  divElemt.innerHTML = viewHome;
  return divElemt;
};
