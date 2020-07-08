export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: [],
  date: new Date(),
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

// cargar imagen
export const uploadImage = (date, img) => {
  const postImageRef = firebase.storage().ref().child(`imagenes/${img.name}`);
  const metadata = { contentType: img.type };
  return postImageRef.put(img, metadata)
    .then(snapshot => (snapshot.ref.getDownloadURL()));
};

// delete post
export const deletePost = idPost => firebase.firestore().collection('posts').doc(idPost).delete();
// borrar subcoleccion comments si se elimina el post padre

// logout
export const logOut = () => firebase.auth().signOut();

// actualizar datos del usuario loguedado por gmail y facebook
export const updateUser = (idDoc, newUserName, newUserPhoto, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  infoUser: newInfoUser,
  photoURL: newUserPhoto,
});

export const createUser = (idDoc, newUserName, newUserPhoto, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).set({
  displayName: newUserName,
  infoUser: newInfoUser,
  photoURL: newUserPhoto,
});

export const updateInfoUser = (idDoc, newUserName, newInfoUser) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  infoUser: newInfoUser,
});

// leer datos del usuario
export const getUser = docUser => firebase.firestore().collection('users').doc(docUser).get();

// agregar comentario
export const addComment = (newTextComm, currentUserId, currentPostId) => firebase.firestore().collection('comments')
  .add({
    commTexto: newTextComm,
    commDate: new Date(),
    commUserId: currentUserId,
    commPostId: currentPostId,
  });

// leer comentarios usando where
export const getComments = (idDocPost, callback) => firebase.firestore().collection('comments')
  .orderBy('commDate', 'desc')
  // .where('commPostId', '==', idDocPost)
  .onSnapshot((docsCommentSnapshot) => {
    const output = [];
    docsCommentSnapshot.forEach((doc) => {
      output.push({
        commDocId: doc.id,
        commTexto: doc.data().commTexto,
        commDate: doc.data().commDate,
        commUserId: doc.data().commUserId,
        commPostId: doc.data().commPostId,
      });
    });
    callback(output);
  },
  (err) => {
    console.log(`Encountered error: ${err}`);
  });

// actualizar comentario
export const updateComment = (idComm, newTextComm) => firebase.firestore().collection('comments')
  .doc(idComm)
  .update({
    commTexto: newTextComm,
  });

// eliminar comentario
export const deleteComment = idComm => firebase.firestore().collection('comments')
  .doc(idComm)
  .delete();

export const updateLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });

// export const dataUser = userNameDoc =>
//  firebase.firestore().collection('users').doc(userNameDoc).get();

// db.collection('users').doc(user.uid).set({
//   displayName: user.displayName,
//   photoURL: user.photoURL,
// });
