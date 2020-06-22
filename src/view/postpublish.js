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
        </div>
        <textarea class="only-lines">${data.content}</textarea>
        <span class="post-show-like-comments">${data.likes}</span>
    `;
  // console.log(data.content);
  // console.log(viewpostpublish);
  // const seccionElemt = document.createElement('section');
  // // divElemt.classList.add('viewpostpublish');
  // seccionElemt.innerHTML = viewpostpublish;
  // console.log(data);
  return viewpostpublish;
};
