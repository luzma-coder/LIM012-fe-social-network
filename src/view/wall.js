import { createPost, getPosts } from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default () => {
  const user = firebase.auth().currentUser;
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  const post_a_publicar=[
    {content:"Holaaaa1", date:"16/6/2020",state:"privacity", likes:5},
    {content:"Holaaaa2", date:"15/6/2020",state:"public", likes:3},
    {content:"Holaaaa4", date:"6/6/2020",state:"privacity", likes:1}
];
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
      ${allPost(post_a_publicar)}
      </section>
  </section>
    `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  // divElemt.appendChild(allPost());
  divElemt.innerHTML = viewWall;
  // divElemt.appendChild(allPost(getPosts()));
  getPosts();
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
