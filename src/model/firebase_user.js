// actualizar datos del usuario loguedado por gmail y facebook
export const updateUser = (idDoc, newUserName, newUserPhoto) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  photoURL: newUserPhoto,
});

// leer datos del usuario
export const getUser = docUser => firebase.firestore().collection('users').doc(docUser).get();

// export const dataUser = userNameDoc =>
//  firebase.firestore().collection('users').doc(userNameDoc).get();

// db.collection('users').doc(user.uid).set({
//   displayName: user.displayName,
//   photoURL: user.photoURL,
// });
