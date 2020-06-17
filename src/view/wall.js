export default () => {
  const viewWal = `
    <h2>Holi soy el muro de moves</h2>
    <textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?" id="postArea"></textarea>
    <button id="btnSharePost"> Compartir</button>
    <button id ="btn-logout" class='principal-button'><a class='links-on-buttons' href="#/">CERRAR SESIÓN</a></button>
    `;
  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewWal;
  return divElemt;
};
