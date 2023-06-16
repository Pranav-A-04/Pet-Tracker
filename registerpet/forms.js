// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyC28iIAbluDMJPzRz2nvrME6PiFuNrV3n0',
  authDomain: 'sample2-ea4ce.firebaseapp.com',
  databaseURL: 'https://sample2-ea4ce-default-rtdb.firebaseio.com',
  projectId: 'sample2-ea4ce',
  storageBucket: 'sample2-ea4ce.appspot.com',
  messagingSenderId: '407111677620',
  appId: '1:407111677620:web:97d50288f240a3e1ad89e1',
  measurementId: 'G-HPJQT5DLPG',
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database().ref('pet_tracker');

document.getElementById('petreg').addEventListener('submit', Regpet);
var dburl;
function Regpet(e) {
  e.preventDefault();
  var name = getElementVal('petname');
  var animal = document.getElementById('breed');
  var desc = getElementVal('petdesc');
  var num = getElementVal('contact');
  var email = getElementVal('contact2');
  const ref = firebase.storage().ref();
  const file = document.querySelector('#petpic').files[0];

  if (animal.value === 'd1') {
    animal = 'Golden Retriever';
  } else if (animal.value === 'd2') {
    animal = 'Labrador';
  } else if (animal.value === 'd3') {
    animal = 'Pug';
  } else if (animal.value === 'd4') {
    animal = 'Beagle';
  } else if (animal.value === 'd5') {
    animal = 'Husky';
  } else if (animal.value === 'd6') {
    animal = 'Poodle';
  } else if (animal.value === 'd7') {
    animal = 'German Shepherd';
  } else if (animal.value === 'd8') {
    animal = 'Great Dane';
  }
  const fname = new Date() + '-' + file.name;

  const metadata = {
    contentType: file.type,
  };

  const task = ref.child(fname).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      savemsgs(name, animal, desc, num, email, url);

      console.log(name, animal, desc, num, email);
      alert('Image Uploaded Sucessfully. We Hope You Find the Doggy Soon!');
      document.getElementById('petreg').reset();

      //window.location.assign("index3.html");
    });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

/*

function uploadImage(){
    const ref = firebase.storage().ref()
    const file = document.querySelector("#petpic").files[0]
    
    const name= new Date() + '-' + file.name

    const metadata = {
        contentType:file.type
    }
    

    const task = ref.child(name).put(file, metadata)
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        saveURLtoDB(url);
        console.log(url);
        alert("Image Uploaded Sucessfully. We Hope You Find the Doggy Soon!")
    })
    
}

function saveURLtoDB(URL){
    db.push().set({
        ImgUrl: URL
    });

}
*/
const savemsgs = (name, animal, desc, num, email, url) => {
  var newdb = db.push();
  newdb.set({
    name: name,
    animal: animal,
    desc: desc,
    num: num,
    email: email,
    imgurl: url,
  });
};
