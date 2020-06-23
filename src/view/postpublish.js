import { deletePost } from '../model/firebase_wall.js';

export const allPost = (data) => {
  const viewpostpublish = document.createElement('article');
  viewpostpublish.classList.add('post-format');
  viewpostpublish.innerHTML = `
        <div class="header-post-publish">
          <span>${data.date}</span>
          <select>
            <option value="privacity">privado</option>
            <option value="public">publico</option>
          </select>
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
  // const seccionElemt = document.createElement('section');
  // // divElemt.classList.add('viewpostpublish');
  // seccionElemt.innerHTML = viewpostpublish;
  // console.log(data);
  return viewpostpublish;
};
