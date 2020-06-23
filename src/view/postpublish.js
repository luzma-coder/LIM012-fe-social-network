import { updatePost } from '../model/firebase_wall.js';

const ToEditPost = (btnSavePost, btnCancelPost, textAPost, selPrivPost, idDoc) => {
  const btnShow = (btnToShow) => {
    btnToShow.classList.add('show');
    btnToShow.classList.remove('hide');
  };
  const btnHide = (btnToHide) => {
    btnToHide.classList.remove('show');
    btnToHide.classList.add('hide');
  };
  let oldtextAPost = textAPost.value;
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
    btnHide(btnCancelPost);
    btnHide(btnSavePost);
    textAPost.value = oldtextAPost;
    textAPost.disabled = true;
    selPrivPost.disabled = true;
  });
};

export const allPost = (data) => {
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  viewpostpublish.innerHTML = `
        <div class="header-post-publish">
          <span>${data.date}</span>
          <select id="selec-privacy-${data.id}" disabled="true">
            <option value="privacity">privado</option>
            <option value="public">publico</option>
          </select>
          <span>${data.privacy}</span>
          <img id="btn-edit-post-${data.id}" class="show circulo-imgbut bgcolor" src="img/edit.svg" alt="Editar Post">
          <img id="btn-save-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/save.svg" alt="Guardar cambios">
          <img id="btn-cancel-post-${data.id}" class="hide circulo-imgbut bgcolor" src="img/x.svg" alt="Cancelar cambios">
        </div>
        <textarea id="textarea-${data.id}" class="only-lines" disabled="true">${data.content}</textarea>
        <span class="post-show-like-comments">${data.likes}</span>
    `;
  // actualizar post
  const btnEditPost = viewpostpublish.querySelector(`#btn-edit-post-${data.id}`);
  const btnSavePost = viewpostpublish.querySelector(`#btn-save-post-${data.id}`);
  const btnCancelPost = viewpostpublish.querySelector(`#btn-cancel-post-${data.id}`);
  const textAPost = viewpostpublish.querySelector(`#textarea-${data.id}`);
  const selPrivPost = viewpostpublish.querySelector(`#selec-privacy-${data.id}`);
  // evento click para editar
  btnEditPost.addEventListener('click', () => {
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.remove('show');
    viewpostpublish.querySelector(`#btn-edit-post-${data.id}`).classList.add('hide');
    ToEditPost(btnSavePost, btnCancelPost, textAPost, selPrivPost, data.id);
  });
  return viewpostpublish;
};
