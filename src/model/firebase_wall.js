export const db = firebase.firestore();
// Agrega datos
export const createPost = db.collection('users').add({
  userId: uid,
  user: userName,
  userPhoto,
  content: contentText,
  likes: 0,
  date: new Date(),
  state: privacy,
  image: postImage,
})
  .then((user) => {
    console.log('Document written with ID: ', user.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });

// lee datos

export const getPosts = db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});
