import { createPost, getPosts } from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default () => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  // const publicar = getPosts((objArray);

  // console.log(nameUser, photoUser);
  const viewWall = `
  <aside class="user">
      <div id="user-data">
        <div class="circulo">
          <img class="img-circulo" src="${photoUser}" alt="">
        </div>
        <p class="user-name">${nameUser}</p>
      </div>
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
              <option value="privacity">privado</option>
              <option value="public">publico</option>
          </select>
          <textarea id="post-new-text" cols="" rows="3" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
            <label class ="btn btn-file">
              <input type="file" name="" id="get-file" hidden>
              <img class="circulo-img bgcolor" src="img/image.svg" alt="Insertar imagen">
            </label>
            <button class="bgcolor" id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section id="post-published">
      </section>
  </section>
    `;
  // añadir este estilo clase overflow para crear un scroll
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;
  const postSection = divElemt.querySelector('#post-published');
  getPosts((objArray) => {
    // allPost(objArray);
    postSection.innerHTML = '';
    objArray.forEach((element) => {
      postSection.appendChild(allPost(element));
    });
    console.log(objArray);
  });
  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  if (user) {
    db.collection('users').doc(user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    btnCreatePost.addEventListener('click', () => {
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;

      // Seccion cargar imagen en el post
      const file = divElemt.querySelector('#get-file');
      let imgPost = '';
      if (file.value !== '') {
        imgPost = file.value;
      }
      console.log(imgPost);

      // Seccion crear nuevo post
      createPost(user.uid, contentText, privacy, imgPost)
        .then((result) => {
          getPosts(() => {
          });
        });
    });
  }
  return divElemt;
};
