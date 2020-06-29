export default () => {
  const viewProfile = `
            <h1>holi soy un perfil</h1>
            <p>Aquí editaras tus datos</p>
          `;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = viewProfile;
  return divElemt;
};
