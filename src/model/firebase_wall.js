// const db = firebase.firestore();
// Agrega datos
export const createPost = (uid, contentText, privacy, imgPost) => firebase.firestore().collection('posts').add({
  userId: uid,
  content: contentText,
  likes: 0,
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
        content: doc.data().content,
        likes: doc.data().likes,
        date: doc.data().date,
        state: doc.data().state,
        img: doc.data().img,
      });
    });
    callback(output);
  });

/* export const uploadImage = (date, file) => {
  const postfileRef = firebase.storage().ref().child(`images/${date}-${file.name}`);
  const metadata = { contentType: file.type };
  return postfileRef.put(file, metadata)
    .then(snapshot => snapshot.ref.getDownloadURL());
}; */
