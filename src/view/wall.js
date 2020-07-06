import {
  createPost, getPosts, logOut, uploadImage, getUser,
} from '../model/firebase_wall.js';
import { allPost } from './postpublish.js';

export default (profile) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  // dataUser(user.uid).then((userData) => {
  //   // const photoUser = userData.photoUser;
  //   // const nameUser = userData.nameUser;
  //   console.log(userData);
  //   console.log(userData.doc());
  //   console.log(userData.doc().nameUser);
  //   console.log(userData.doc().photoUser);
  // });
  // console.log(nameUser);
  const viewWall = `
  <aside class="user">
    <div id="userInfo">
    <img class="circulo-profile" src=""><a class='hide' href=''><a class='hide' class='edit-button hide' href=''><i class="far fa-edit"></i></a>
    <p content-editable='true' id="user-name-profile"></p><a class='hide' class='edit-button hide' href=''><i class="far fa-edit"></i></a>
    <input class="hide" class="inputProfile" type="text" value=""> 
    <p content-editable='true' class="profile-text" id="description">Aprendiendo a bailar</p><a class='edit-button hide' href=''><i class="far fa-edit"></i></a> 
    <input class="inputProfile hide" type="text" value="">    
    </div>
  </aside>
  <section class="post">
      <section id="post-new">
          <select id="post-new-privacity">
          <option value="public">🌎 Público</option>
          <option value="privacity">🔒 Privado</option>
          </select>
          <textarea id="post-new-text" cols="" rows="3" placeholder="¿Qué pasos compartiras hoy?"></textarea>
          <div class="post-buttoms">
            <label class ="btn btn-file">
              <input class='allInputs' type="file" name="" id="get-file" hidden>
              <img class="circulo-img bgcolor" src="img/image.svg" alt="Insertar imagen">
            </label>
            <button class="bgcolor" id="post-btn-publish">PUBLICAR</button>
          </div>
      </section>
      <section id="post-published">
      </section>
  </section>
    `;
  // Pinta todos los posts y segun el state de la privacidad, los hace visible o no //
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-wall');
  divElemt.innerHTML = viewWall;
  const postSection = divElemt.querySelector('#post-published');
  // revisar y simplificar la función.
  // DOM para agregar Info del usuario //
  const nameProfile = divElemt.querySelector('#user-name-profile');
  const photoProfile = divElemt.querySelector('.circulo-profile');
  const editButton = divElemt.querySelector('.edit-button');
  const inputsProfile = divElemt.querySelector('.inputProfile');
  getUser(user.uid)
    .then((docUser) => {
      console.log(docUser.data().displayName);
      nameProfile.innerHTML = docUser.data().displayName;
      photoProfile.src = docUser.data().photoURL;
      if (profile === true) {
        editButton.classList.remove('hide');
        inputsProfile.classList.remove('hide');
      }
    });
  getPosts((objArray) => {
    postSection.innerHTML = '';
    objArray.forEach((element) => {
      if (profile === true) {
        if (element.userId === user.uid) {
          db.collection('users').doc(element.userId).get()
            .then((doc) => {
              postSection.appendChild(allPost(element, doc.data()));
            });
        }
      } else if (element.state !== 'privacity' || element.userId === user.uid) {
        db.collection('users').doc(element.userId).get()
          .then((doc) => {
            postSection.appendChild(allPost(element, doc.data()));
          });
      }
    });
  });
  // DOM para el cerrar sesion //
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#/';
        document.querySelector('#header').classList.remove('show');
        document.querySelector('#header').classList.add('hide');
        // changeHash('#/');
      });
  });
  // En esta seccion se crea post con o sin imagen
  const btnCreatePost = divElemt.querySelector('#post-btn-publish');
  if (user) {
    btnCreatePost.addEventListener('click', (event) => {
      event.preventDefault();
      const file = divElemt.querySelector('#get-file');
      const date = new Date().toLocaleString();
      const imgPost = file.files[0];
      const privacy = divElemt.querySelector('#post-new-privacity').value;
      const contentText = divElemt.querySelector('#post-new-text').value;
      divElemt.querySelector('#post-new-text').value = '';
      if (imgPost === undefined) {
        createPost(user.uid, contentText, privacy, '');
        console.log('Se creo post sin imagen');
      } else {
        uploadImage(date, imgPost)
          .then(url => console.log(url) || createPost(user.uid, contentText, privacy, url));
        file.value = '';
        console.log('Se subio la imagen');
      }
    });
  }
  return divElemt;
};
