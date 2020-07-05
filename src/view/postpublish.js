import {
  updatePost, deletePost, updateLike, addComment, getComments, getUser,
} from '../model/firebase_wall.js';

const ToEditPost = (btnSavePost, btnCancelPost, idDoc) => {
  const textAPost = document.querySelector(`#textarea-${idDoc}`);
  const selPrivPost = document.querySelector(`#selec-privacy-${idDoc}`);
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
              <h4>${nameUser}</h4>
              <div id='miniButtons'>
                  <img id="btn-edit-post-${data.id}" class="showbtn circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
                  <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
                  <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
                  <a id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
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
  <div class="image-post" id ="get-file-upload" type="file" accept="image/*">
    ${(data.img !== undefined) ? `<img class="image-post" src="${imgPost}" alt=""/>` : ''}
  </div>
  <img id ="btnLike-${data.id}" class="mini-img" src="img/like.svg" alt="likes" title="likes"/>
  <p class="counter-text">${data.likes.length}</p><p class="counter-text">Likes</p>
  <img id="btn-show-comm" class="i-send" src="img/message-square.svg" alt="Mostrar Comentarios">
  <span> Comentarios </span>
  <section id="comments" class="hide">
    <div class="new-comment">
      <img class="circulo-min" src="${userActual.photoURL}" alt="">
      <input type="text" class="bg" id="txtNewComm-${data.id}" placeholder="Escriba un comentario">
      <img id="btn-save-comm-${data.id}" class="i-send" src="img/send.svg" alt="Grabar Comentario">
    </div>
    <section id="old-comments"></section>
  </section>
  `;
  // post: cargar valor de privacidad en select
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
  // const textAPost = viewpostpublish.querySelector(`#textarea-${data.id}`);
  // const selPrivPost = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  // evento click para editar
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('showbtn');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, data.id);
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('hide');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('showbtn');
  });

  // eliminar post
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));

  // comentarios: agregar nuevo comentario
  const btnSaveComment = viewpostpublish.querySelector(`#btn-save-comm-${data.id}`);
  btnSaveComment.addEventListener('click', () => {
    const NewComm = viewpostpublish.querySelector(`#txtNewComm-${data.id}`).value;
    if (NewComm) {
      addComment(data.id, NewComm, userActual.uid);
    }
    viewpostpublish.querySelector(`#txtNewComm-${data.id}`).value = '';
    viewpostpublish.querySelector(`#txtNewComm-${data.id}`).focus();
  });

  // comentarios: mostrar seccion de comentarios
  const secComments = viewpostpublish.querySelector('#comments');
  const btnShowComments = viewpostpublish.querySelector('#btn-show-comm');
  btnShowComments.addEventListener('click', () => {
    secComments.classList.toggle('hide');
  });

  // comentarios: leer y mostrar comentarios anteriores
  const secOldComments = viewpostpublish.querySelector('#old-comments');
  getComments(data.id, (arrayComm) => {
    secOldComments.innerHTML = '';
    arrayComm.forEach((element) => {
      const artElement = document.createElement('article');
      artElement.classList.add('comment-main');
      getUser(element.commUserId)
        .then((docUser) => {
          artElement.innerHTML = `
      <img class="circulo-min" src="${docUser.data().photoURL}" alt="">
      <div class="comment-data bg">
        <div>
          <h4 class="comment-name">${docUser.data().displayName}</h4>
          <span class="comment-date">04jul2020 11:30</span>
          <p id="txtNewComm-${element.commDocId}">${element.commTexto}</p>
        </div>
      </div>
      <div>
        <img class="i-mnu-options" id="options" src="img/more-horizontal.svg">
      </div>
        `;
          secOldComments.appendChild(artElement);
        });
    });
  });

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
