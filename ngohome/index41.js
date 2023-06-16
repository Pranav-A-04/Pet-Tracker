function prediction() {
  db.child('Found')
    .get()
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        const pred = document.createElement('p');
        pred.innerHTML = childSnapshot.val();
        document.getElementById('div2').appendChild(pred);
      });
    });
}
