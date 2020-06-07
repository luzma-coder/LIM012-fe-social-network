export const newUser = (email, pass) => firebase.auth()
  .createUserWithEmailAndPassword(email, pass);
