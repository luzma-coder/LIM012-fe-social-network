export const newUser = (email, pass) => firebase.auth()
  .createUserWithEmailAndPassword(email, pass);

export const logIn = (email, pass) => firebase.auth()
  .signInWithEmailAndPassword(email, pass);

export const verifEmail = (email) => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      console.log(email);
    });
};
