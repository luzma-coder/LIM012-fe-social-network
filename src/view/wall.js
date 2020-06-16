import { createPost, getPosts } from '../model/firebase_wall.js';
// import { allPost } from './postpublish.js';

export default () => {
  const user = firebase.auth().currentUser;
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  console.log(nameUser, photoUser);
  const viewWall = `
  <header> <span>MOVES</span>
  <button id = "btn-logout" class=''><a class='' href="#/">CERRAR SESIÓN</a></button>  
  </header>
  <aside class="user">
      <div id="user-data">
          <img id="user-img" src="${photoUser}" alt="">
          <p id="user-name">${nameUser}</p>
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
      </section>
  </section>
    `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;

  // divElemt.appendChild(allPost(getPosts()));

  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  // const user = firebase.auth().currentUser;
  if (user) {
    // console.log(user);
    firebase.firestore().collection('users').doc(user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    btnCreatePost.addEventListener('click', () => {
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;
      // console.log(contentText, privacy);
      createPost(user.uid, contentText, privacy, '')
        .then((result) => {
          getPosts();
        // console.log(result);
        });
    });
  }
  return divElemt;
};
