const firebaseConfig = {
  apiKey: 'AIzaSyCCwd9inSJoXNrCLN-P710F68U1x8YwsX8',
  authDomain: 'plslogin-5bb9a.firebaseapp.com',
  databaseURL: 'https://plslogin-5bb9a-default-rtdb.firebaseio.com',
  projectId: 'plslogin-5bb9a',
  storageBucket: 'plslogin-5bb9a.appspot.com',
  messagingSenderId: '199373232027',
  appId: '1:199373232027:web:9bc299af261fc44fa5f33e',
  measurementId: 'G-PYRSPQ1LWX',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.database();
const dbref = db.ref();
function signup() {
  const email = document.getElementById('email2').value;
  const phone = document.getElementById('phone').value;
  const fullname = document.getElementById('name').value;
  const pwd = document.getElementById('pwd2').value;
  const cpwd = document.getElementById('pwd3').value;
  if (cpwd != pwd) {
    alert('passwords do not match!!');
    return;
  }
  if (email == null) {
    alert('email field cant be empty!!');
    return;
  }
  if (phone.length != 10) {
    alert('please enter a valid phone number!');
  }

  auth
    .createUserWithEmailAndPassword(email, pwd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      window.location.assign('../homepage/index1.html');

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
  document.getElementById('createacc').reset();
}

function signin() {
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('pwd').value;

  auth
    .signInWithEmailAndPassword(email, pwd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.assign('../homepage/index1.html');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
  document.getElementById('loginn').reset();
}

function resetpwd() {
  const email = document.getElementById('email').value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('password reset email sent successfully');
    })
    .catch((error) => {
      consolerror(error);
    });
}
const db2 = dbref.child('unregistered');

function verifyngo() {
  const email = document.getElementById('email5').value;
  const phone = document.getElementById('phone5').value;
  const fullname = document.getElementById('name5').value;
  const pwd = 12345678; //document.getElementById('pwd5').value;
  dbref
    .child('ngo')
    .get()
    .then((snapshot) => {
      const ngodeets = [];
      snapshot.forEach((childsnapshot) => {
        //ngodeets.push(childsnapshot.val());
        childsnapshot.forEach((ccsnapshot) => {
          ngodeets.push(ccsnapshot.val());
        });
      });
      const n = ngodeets.length;
      for (i = 0; i < n; i++) {
        if (i % 3 == 0) {
          if (
            ngodeets[i] == email &&
            ngodeets[i + 1] == fullname &&
            ngodeets[i + 2] == phone
          ) {
            /*var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'file:///C:/Users/Pranav%20A/Desktop/rvit%20hack/index4.html',
            // This must be true
            handleCodeInApp: true
          };
          auth.sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });*/

            auth
              .createUserWithEmailAndPassword(email, pwd)
              .then(() => {
                auth.currentUser.sendEmailVerification().then(() => {
                  alert('verification mail has been sent!');
                  auth.onAuthStateChanged(() => {
                    if (auth.currentUser) {
                      if (auth.currentUser.emailVerified) {
                        window.location.assign('../ngohome/index4.html');
                      }
                    }
                    document.getElementById('ngo').reset();
                  });
                });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorCode) {
                  case 'auth/email-already-in-use':
                    auth
                      .signInWithEmailAndPassword(email, pwd)
                      .then(() => {
                        // Signed in
                        auth.onAuthStateChanged(() => {
                          if (auth.currentUser) {
                            if (auth.currentUser.emailVerified) {
                              window.location.assign('../ngohome/index4.html');
                              document.getElementById('ngo').reset();
                            }
                          }
                        });

                        // ...
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        alert(errorMessage);
                      });
                }
              });

            return;
          }
        }
      }
      if (i == n) {
        savemsgs(email, phone, fullname);
        
        alert(
          'Sorry, your organization is not part of our database. Your organization will be verified within 24-48hrs',
        );
        document.getElementById('ngo').reset();
      }
      console.log(ngodeets);
    });
}

function caf() {
  const loginform = document.querySelector('#loginn');
  const createaccform = document.querySelector('#createacc');
  loginform.classList.add('hide');
  createaccform.classList.remove('hide');
}

function btlf() {
  const loginform = document.querySelector('#loginn');
  const createaccform = document.querySelector('#createacc');
  const ngoform = document.querySelector('#ngo');
  loginform.classList.remove('hide');
  createaccform.classList.add('hide');
  ngoform.classList.add('hide');
}

function vnf() {
  const loginform = document.querySelector('#loginn');
  const ngoform = document.querySelector('#ngo');
  loginform.classList.add('hide');
  ngoform.classList.remove('hide');
}

const savemsgs = (name, phone, email) => {
  var newdb = db2.push();
  newdb.set({
    name: name,
    phone: phone,
    email: email,
  });
};
