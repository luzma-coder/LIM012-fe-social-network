export default () => {
  const viewRegister = `
  <div>
  <h1>CREA TU CUENTA</h1>
  <input type="text" placeholder="Nombres y Apellidos">
  <input type="text" placeholder="Correo electronico">
  <input type="text" placeholder="Contraseña">
  <a href="#/register">registrate</a>
  </div>`;
  const divElemt = document.createElement('div');

  divElemt.innerHTML = viewRegister;
  return divElemt;
};
