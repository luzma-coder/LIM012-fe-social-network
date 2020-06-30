export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: 0,
  date: new Date().toLocaleString(),
  state: privacy,
  img: imgPost,
});

// lee datos
export const getPosts = callback => firebase.firestore().collection('posts')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const output = [];
    querySnapshot.forEach((doc) => {
      output.push({
        id: doc.id,
        userId: doc.data().userId,
        content: doc.data().content,
        likes: doc.data().likes,
        date: doc.data().date,
        state: doc.data().state,
        img: doc.data().img,
      });
    });
    callback(output);
  });
  // actualiza post

export const updatePost = (idPost, newContent, newPrivacy) => {
  const refPost = firebase.firestore().collection('posts').doc(idPost);
  return refPost.update({
    content: newContent,
    state: newPrivacy,
  });
};
// export const createComm= (idPost, txtComment, idUserComm) => {
//   const refPost = firebase.firestore().collection('posts').doc(idPost);
//   return refPost.update({
//     postComments[idx].commTexto : txtComment,
//   });
// };
// postComments: [],

export const logOut = () => firebase.auth().signOut();

export const deletePost = idPost => firebase.firestore().collection('posts').doc(idPost).delete();

export const deleteDoc = idComm => firebase.firestore().collection('posts').doc(idComm).delete();

export const updateUser = (idDoc, newUserName, newUserPhoto) => firebase.firestore().collection('users').doc(idDoc).set({
  displayName: newUserName,
  photoURL: newUserPhoto,
});

// export const dataUser = userNameDoc =>
//  firebase.firestore().collection('users').doc(userNameDoc).get();

// db.collection('users').doc(user.uid).set({
//   displayName: user.displayName,
//   photoURL: user.photoURL,
// });
