
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPSfgghGrN2iN5lhxaSq5F_5iGj73aIxo",
  authDomain: "pet-tracker-a136c.firebaseapp.com",
  databaseURL: "https://pet-tracker-a136c-default-rtdb.firebaseio.com",
  projectId: "pet-tracker-a136c",
  storageBucket: "pet-tracker-a136c.appspot.com",
  messagingSenderId: "1002772084818",
  appId: "1:1002772084818:web:0d1ee6e3e6e7efe471478b",
  measurementId: "G-3XGZH27GP2"
};

  // Initialize Firebas
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("LatLong");
var petmark;



let map;
function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {lat: 12.935222, lng:77.535481},
        mapId: "db4ee3a9dfe7654f",
        mapTypeId: "roadmap"
    });
    map.setTilt(45); 
}

function addBuoy(location){
  const shape = {
    coords: []
  }
    const svgMarker = {
      path: `M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z`,
      fillColor: "#A020F0",
      fillOpacity: 1.0,
      strokeWeight: 1,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(0, 20),
    }
    const image = "https://thumbs.dreamstime.com/b/white-animal-paw-print-icon-isolated-black-background-white-animal-paw-print-icon-isolated-black-background-vector-111946193.jpg";
    const marker = new google.maps.Marker({
    icon: svgMarker,
    position: location,
    map: map,
  });
  
}

//window.initMap = initMap();
db.on('value', snapshot => {
    let data=snapshot.val();
   
    //onlocationchange(data);
    const l=Object.values(data);
    for(let i in l)
    {
      const str=l[i].split(",");
      var centerPoint = new google.maps.LatLng(str[0],str[1]);
      console.log(centerPoint)
      addBuoy(centerPoint);
    }
    /*for(let i in l){
        var centerPoint = new google.maps.Latlng(str[0], str[1]);
        addBuoy(centerPoint);
    }*/
})


    
