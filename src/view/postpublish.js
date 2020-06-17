export const allPost = (data) => {
  let viewpostpublish = '';
  data.forEach((element) => {
    viewpostpublish += `
     <article id="post-publish-">
        <div>
          <p>${element.date}</p>
          <p class="post-text">${element.content}</p>
          <p class="post-show-like-comments">${element.likes}</p>
        </div>
    </article>
    `;
  });

  const seccionElemt = document.createElement('section');
  // divElemt.classList.add('viewpostpublish');
  seccionElemt.innerHTML = viewpostpublish;
  console.log(data);
  return seccionElemt;
};
