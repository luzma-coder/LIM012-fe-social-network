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
