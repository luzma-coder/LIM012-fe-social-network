import { createPost, getPosts } from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default () => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const nameUser = user.displayName;
  const photoUser = user.photoURL;

  // console.log(nameUser, photoUser);
  let viewWall = `
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
    `;
  // getPosts((objArray) => {
  //   console.log(objArray);
  // });

  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;
  getPosts((objArray) => {
    divElemt.innerHTML += allPost(objArray);
  });
  divElemt.innerHTML += `
    </section>
  </section>
  `;

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
      // const date = new Date().toString;

      const file = divElemt.querySelector('#get-file');
      let imgPost = '';
      if (file.value !== '') {
        imgPost = file.value;
      }
<<<<<<< HEAD

=======
>>>>>>> 02f59250b553b16d909103b74a8b60011ed82752
      // Seccion crear nuevo post
      createPost(user.uid, contentText, privacy, imgPost);
    });
  }
  return divElemt;
};
