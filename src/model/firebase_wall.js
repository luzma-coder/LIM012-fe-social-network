export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: [],
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
export const updateUser = (idDoc, newUserName, newUserPhoto) => firebase.firestore().collection('users').doc(idDoc).update({
  displayName: newUserName,
  photoURL: newUserPhoto,
});

// leer datos del usuario
export const getUser = docUser => firebase.firestore().collection('users').doc(docUser).get();

// agregar comentario
export const addComment = (idPost, newTextComm, currentUserId) => firebase.firestore().collection('posts').doc(idPost).collection('comments')
  .add({
    commTexto: newTextComm,
    commDate: new Date(),
    commUserId: currentUserId,
  });

// leer subcoleccion comentarios
export const getComments = (idDocPost, callback) => firebase.firestore().collection('posts').doc(idDocPost).collection('comments')
  .orderBy('commDate', 'desc')
  .onSnapshot((docsCommentSnapshot) => {
    const output = [];
    docsCommentSnapshot.forEach((doc) => {
      output.push({
        commDocId: doc.id,
        commTexto: doc.data().commTexto,
        commDate: doc.data().commDate,
        commUserId: doc.data().commUserId,
      });
    });
    callback(output);
  },
  (err) => {
    console.log(`Encountered error: ${err}`);
  });

//
//   db.collection("cities").doc("SF")
//   .onSnapshot(function(doc) {
//       console.log("Current data: ", doc.data());
//   });
//   000000000000000000000000
//   let doc = db.collection('cities').doc('SF');

// let observer = doc.onSnapshot(docSnapshot => {
//   console.log(`Received doc snapshot: ${docSnapshot}`);
//   // ...
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });
// 0000000000000000000000000000

// actualizar comentario
export const updateComment = (idDoc, idComm, newTextComm) => firebase.firestore().collection('posts').doc(idDoc).collection('comments')
  .doc(idComm)
  .update({
    commTexto: newTextComm,
  });

// eliminar comentario
export const deleteDoc = (idPost, idComm) => firebase.firestore().collection('posts').doc(idPost).collection('comments')
  .doc(idComm)
  .delete();

export const updateLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });

// export const dataUser = userNameDoc =>
//  firebase.firestore().collection('users').doc(userNameDoc).get();

// db.collection('users').doc(user.uid).set({
//   displayName: user.displayName,
//   photoURL: user.photoURL,
// });
