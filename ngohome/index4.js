const firebaseConfig = {
  apiKey: 'AIzaSyAPSfgghGrN2iN5lhxaSq5F_5iGj73aIxo',
  authDomain: 'pet-tracker-a136c.firebaseapp.com',
  databaseURL: 'https://pet-tracker-a136c-default-rtdb.firebaseio.com',
  projectId: 'pet-tracker-a136c',
  storageBucket: 'pet-tracker-a136c.appspot.com',
  messagingSenderId: '1002772084818',
  appId: '1:1002772084818:web:0d1ee6e3e6e7efe471478b',
  measurementId: 'G-3XGZH27GP2',
};
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();
const db = firebase.database().ref();
document.getElementById('form').addEventListener('submit', Regpet);
var dburl;
function Regpet(e) {
  e.preventDefault();

  const ref = firebase.storage().ref();
  const file = document.querySelector('#petpic').files[0];

  const fname = new Date() + '-' + file.name;

  const metadata = {
    contentType: file.type,
  };

  const task = ref.child(fname).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      savemsgs(url);

      console.log(url);

      alert('Image Uploaded Sucessfully.');

      document.getElementById('form').reset();

      //window.location.assign("index3.html");
    });
}

const savemsgs = (url) => {
  db.child('url').set({
    imgurl: url,
  });
};
