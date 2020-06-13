export default () => {
  const viewWall = `
  <header> <span>MOVES</span>
  <button id = "btn-logout" class=''><a class='' href="#/">CERRAR SESIÓN</a></button>  
  </header>
  <aside class="user">
      <div id="user-data">
          <img id="user-img" src="./img/foto.jpg" alt="">
          <p class="user-name">Victoria Robertson</p>
      </div>
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
              <option value="privacity">privado</option>
              <option value="public">publico</option>
          </select>
          <textarea id="post-new-text" cols="" rows="5" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
              <button id="post-btn-image">IMAGEN</button>
              <button id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section id="post-publish">
          <article id="post-publish-1">
              <div>
                  <p>Nombre Apellido</p>
                  <p class="post-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <p class="post-show-like-comments">likes comentarios</p>
              </div>
          </article>
          <article id="post-publish-2">
              <div>
                  <p>Nombre Apellido</p>
                  <p class="post-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <p class="post-show-like-comments">Like      Comentario</p>
              </div>
          </article>
      </section>
  </section>
    `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;
  const user = firebase.auth().currentUser;
  console.log(user);
  return divElemt;
};
