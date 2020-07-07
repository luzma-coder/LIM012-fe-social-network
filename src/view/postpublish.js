import {
  updatePost, deletePost, updateLike,
} from '../model/firebase_wall.js';

const ToEditPost = (btnSavePost, btnCancelPost, textAPost, selPrivPost, idDoc) => {
  const btnShow = (btnToShow) => {
    btnToShow.classList.add('showbtn');
    btnToShow.classList.remove('hide');
  };
  const btnHide = (btnToHide) => {
    btnToHide.classList.remove('showbtn');
    btnToHide.classList.add('hide');
  };
  const oldtextAPost = textAPost.value;
  textAPost.disabled = false;
  selPrivPost.disabled = false;
  btnShow(btnSavePost);
  btnShow(btnCancelPost);
  // evento click para grabar
  btnSavePost.addEventListener('click', () => {
    btnHide(btnSavePost);
    btnHide(btnCancelPost);
    updatePost(idDoc, textAPost.value, selPrivPost.value);
  });
  btnCancelPost.addEventListener('click', () => {
    // btnEditPost = document.querySelector();
    btnHide(btnCancelPost);
    btnHide(btnSavePost);
    // btnShow(btnEditPost);
    textAPost.value = oldtextAPost;
    textAPost.disabled = true;
    selPrivPost.disabled = true;
    introCancel = true;
  });
};

export const allPost = (data, autor) => {
  const userActual = firebase.auth().currentUser;
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  const nameUser = autor.displayName;
  const photoUser = autor.photoURL;
  const imgPost = data.img;
  viewpostpublish.innerHTML = `
     <div>
        <div id="user-data">
          <img class="circulo-min" src="${photoUser}" alt="">
          <div id='infoUserPost'>
            <div id='infoAlign'>
              <h4 class="user-name">${nameUser}</h4>
              <div id='miniButtons'>
                  <img id="btn-edit-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
                  <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
                  <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
                  <a class="hide" id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
              </div>
            </div>
              <div class='post-date'> 
                <p>${data.date}</p>
                <select class='select-edited' id="selec-privacy-${data.id}" disabled="true">
                  </select>
              </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <textarea id="textarea-${data.id}" class="only-lines" disabled="true">${data.content}</textarea>
  <div id ="get-file-upload" type="file" accept="image/*">
    ${(data.img !== undefined) ? `<img class="image-post" src="${imgPost}" alt=""/>` : `<img class="hide image-post" src="${imgPost}" alt=""/>`}
  </div>
  <img id ="btnLike-${data.id}" class="mini-img" src="img/like.svg" alt="likes" title="likes"/>
  <p class="counter-text">${data.likes.length}</p><p class="counter-text">Likes</p>
  `;
  // cargar valor de privacidad en select
  const selectPriv = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  const optionpublic = document.createElement('option');
  const optionprivac = document.createElement('option');
  optionpublic.value = 'public';
  optionprivac.value = 'privacity';
  optionpublic.innerHTML = '🌎';
  optionprivac.innerHTML = '🔒';
  if (data.state === 'privacity') {
    selectPriv.appendChild(optionprivac);
    selectPriv.appendChild(optionpublic);
  } else {
    selectPriv.appendChild(optionpublic);
    selectPriv.appendChild(optionprivac);
  }

  const btnLike = viewpostpublish.querySelector(`#btnLike-${data.id}`);
  btnLike.addEventListener('click', () => {
    // event.preventDefault();
    const arrayLikes = data.likes.indexOf(userActual.uid);
    if (arrayLikes === -1) {
      data.likes.push(userActual.uid);
      updateLike(data.id, data.likes);
    } else {
      data.likes.splice(arrayLikes, 1);
      updateLike(data.id, data.likes);
    }
    console.log(data.likes);
    console.log(userActual.uid);
    console.log(data.likes.length);
  });


  // actualizar post
  const btnEditPost = viewpostpublish.querySelector(`#btn-edit-post-${data.id}`);
  const btnSavePost = viewpostpublish.querySelector(`#btn-save-post-${data.id}`);
  const btnCancelPost = viewpostpublish.querySelector(`#btn-cancel-post-${data.id}`);
  const textAPost = viewpostpublish.querySelector(`#textarea-${data.id}`);
  const selPrivPost = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);

  // Ocultar botones cuando el usuario logueado no es dueño del post
  if (userActual.uid === data.userId) {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('hide');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('showbtn');
    viewpostpublish.querySelector(`#btn-delete-${data.id}`).classList.remove('hide');
    // viewpostpublish.querySelector(`#btn-delete-${data.id}`).classList.add('showbtn');
  }

  // evento click para editar
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('showbtn');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, textAPost, selPrivPost, data.id);
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('hide');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('showbtn');
  });
  // const btnDeletePost = document.querySelector(`#btn-delete-${data.id}`);
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));

  // btnDeletePost.addEventListener('click', () => {
  //   deletePost(data.id);
  //   console.log(data.id);
  // });
  // console.log(data.content);
  // console.log(viewpostpublish);
  // console.log(data);
  return viewpostpublish;
};


// btnDeletePost.addEventListener('click', () => {
//   deletePost(data.id);
//   console.log(data.id);
// });
// console.log(data.content);
// console.log(viewpostpublish);
// console.log(data);
