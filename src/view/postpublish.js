import { deletePost } from '../model/firebase_wall.js';

export const allPost = (data) => {
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  const user = firebase.auth().currentUser;
  const nameUser = user.displayName;
  const photoUser = user.photoURL;
  viewpostpublish.innerHTML = `
     <div class="user">
      <div id="user-data">
      <div>
          <img class="circulo-min" src="${photoUser}" alt="">
      </div>
      <p class="user-name">${nameUser}</p> <span> ${data.state}</span>
      </div>
      <span>${data.date}</span>
          <select>
          <option value="edit">Editar</option>
          <option value="del">Eliminar</option>
          </select>
          <a id='btn-delete-${data.id}'><img class="mini-img bgcolor" src="img/trash.png" alt="Insertar imagen"></a>
        </div>
        <textarea class="only-lines">${data.content}</textarea>
        <span class="post-show-like-comments">${data.likes}</span>
    `;
  // const btnDeletePost = document.querySelector(`#btn-delete-${data.id}`);
  viewpostpublish.querySelector(`#btn-delete-${data.id}`).addEventListener('click', () => deletePost(data.id));
  console.log(`#btn-delete-${data.id}`);
  // btnDeletePost.addEventListener('click', () => {
  //   deletePost(data.id);
  //   console.log(data.id);
  // });
  // console.log(data.content);
  // console.log(viewpostpublish);
  // console.log(data);
  return viewpostpublish;
};
