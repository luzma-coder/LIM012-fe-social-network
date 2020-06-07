export default () => {
  const viewRegister = `
  <div id='extraEdits'>
  <img class="logo" src="img/logo.png">
  <p class='subtitle'>CREA TU CUENTA</p>
  <div><i class="far fa-user"></i><input type="text" placeholder="Nombres y Apellidos"></div>
  <div><i class="fas fa-at"></i><input type="text" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input type="text" placeholder="Contraseña"></div>
  <button class='principal-button'><a class='links-on-buttons'href="#/register">REGISTRATE</a></button>
  <p class='lil-text'>¿Ya tienes una cuenta?</p><a id='just-link'href="#/">Inicia Sesión</a>
  </div>`;
  const divElemt = document.createElement('div');

  divElemt.innerHTML = viewRegister;
  return divElemt;
};
