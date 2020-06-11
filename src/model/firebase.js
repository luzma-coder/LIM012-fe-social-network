export const newUser = (email, pass) => firebase.auth()
  .createUserWithEmailAndPassword(email, pass);

export const logIn = (email, pass) => firebase.auth()
  .signInWithEmailAndPassword(email, pass);

export const verifEmail = (route) => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      console.log(route);
    });
};
export const googleSignIn = () => {
  const base = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(base);
};
/* export const loginAndVerif = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/wall';
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;
    const providerData = user.providerData;
  } else {
    window.location.hash = '#/';
  }
}); */
