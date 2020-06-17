
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
// export const getPosts = () => firebase.firestore().collection('posts')
//   .orderBy('date', 'desc')
//   .onSnapshot((querySnapshot) => {
//     const data = [];
//     querySnapshot.forEach((doc) => {
//       data.push({ data: doc.data() });
//       // data.push({ id: doc.id, ...doc.data() });
//     });
//     return data;
//     // callback(data);
//   });

// export const getAllPosts = (callback) => {
//   firebase.firestore().collection('posts')
//     .orderBy('date', 'desc')
//     .onSnapshot((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       callback(data);
//     });
// };
export const getPosts = () => firebase.firestore().collection('posts').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.userId, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
