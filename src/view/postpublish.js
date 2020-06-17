export const allPost = (data) => {
  let viewpostpublish = '';
  data.forEach((element) => {
    viewpostpublish += `
     <article class="post-format">
        <div class="header-post-publish">
          <span>${element.date}</span>
          <select>
            <option value="privacity">privado</option>
            <option value="public">publico</option>
          </select>
          <select>
          <option value="edit">Editar</option>
          <option value="del">Eliminar</option>
          </select>
        </div>
        <textarea class="only-lines">${element.content}</textarea>
        <span class="post-show-like-comments">${element.likes}</span>
    </article>
    `;
  });

  // const seccionElemt = document.createElement('section');
  // // divElemt.classList.add('viewpostpublish');
  // seccionElemt.innerHTML = viewpostpublish;
  // console.log(data);
  return viewpostpublish;
};
