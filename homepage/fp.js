const firebaseConfig = {
    apiKey: "AIzaSyCCwd9inSJoXNrCLN-P710F68U1x8YwsX8",
    authDomain: "plslogin-5bb9a.firebaseapp.com",
    databaseURL: "https://plslogin-5bb9a-default-rtdb.firebaseio.com",
    projectId: "plslogin-5bb9a",
    storageBucket: "plslogin-5bb9a.appspot.com",
    messagingSenderId: "199373232027",
    appId: "1:199373232027:web:9bc299af261fc44fa5f33e",
    measurementId: "G-PYRSPQ1LWX"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.database().ref("complaints");

//document.getElementById('report').addEventListener("submit", Regcomp)

function Regcomp() {
    var name = getElementVal("fname");
    var  contact = getElementVal("phone");
    var email = getElementVal("email");
    var company = getElementVal("company");
    var issues = getElementVal("issue");
     
    savemsgs(name, contact, email, company, issues);
    
    console.log(name, contact, email, company, issues);
    alert("Your complaint has been recorded. We will look into this issue immediately!")
    document.getElementById("report").reset();
    

}
function feedback() {
    
    var feedback = getElementVal("feed");
    savemsgs2(feedback);
    console.log(feedback);
    alert("Thank you for your feedback!")
    document.getElementById("feed").reset();

}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

const savemsgs = (name, contact, email, company, issue) => {
    var newdb = db.push();
    newdb.set({
        name: name,
        contact: contact,
        email: email,
        company: company,
        issues: issue
    });
}

const savemsgs2 = (feedback) => {
    var newdb2 = db.push();
    newdb2.set({
        feedback: feedback
    });
}

function signout(){
    auth.signOut().then(() => {
        window.location.assign('../login/login.html')
    })
}
  