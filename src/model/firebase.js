export const newUser = (email, pass) => firebase.auth()
  .createUserWithEmailAndPassword(email, pass).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });

export const logIn = (email, pass) => firebase.auth()
  .signInWithEmailAndPassword(email, pass).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });

export const verifEmail = (email) => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      console.log(email);
    });
};
