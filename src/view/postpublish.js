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
     </div>
        <textarea class="only-lines">${data.content}</textarea>
        <span class="post-show-like-comments">${data.likes}</span>
    `;

  // console.log(viewpostpublish);
  // console.log(data);
  return viewpostpublish;
};
