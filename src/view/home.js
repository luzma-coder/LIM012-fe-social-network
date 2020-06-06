export default () => {
  const viewHome = `
  <div>
  <h1>INICIA SESION</h1>
  <input type="text" placeholder="Correo electronico">
  <input type="text" placeholder="Contraseña">
  <a href="#/">Ingresar</a>
  <h1>No tienes cuenta <a href="#/register">Registrate</a></h1>
  </div>`;
  const divElemt = document.createElement('div');

  divElemt.innerHTML = viewHome;
  return divElemt;
};
