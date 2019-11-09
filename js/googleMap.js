var map;
var price;


function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(49.28066,-123.1230972), zoom: 18});

  var iconBase =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/';


  var latStart;
  var lngStart;
  var latEnd;
  var lngEnd;

  var database = firebase.database().ref('/street/').once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val());

    latStart=childSnapshot.val().lat1; //49.280718
    lngStart=childSnapshot.val().lng1;//-123.122700

    latEnd=childSnapshot.val().lat2;//49.280683
    lngEnd=childSnapshot.val().lng2;//-123.122754
    var colorArea=childSnapshot.val().occupy;
    var color;
    if(colorArea=="n") {
      color='#00ff00'; 
    }else {
      color='#ff0000'
    }


    var coordinates=[
      {lat:latStart, lng:lngStart}, 
      {lat:latEnd, lng:lngEnd}
    ];
    
    var flightPath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 10
    });
    flightPath.setMap(map);
    google.maps.event.addListener(flightPath, 'click', function() {
      openNav();
      price=childSnapshot.val().price;
      document.getElementById('price').innerHTML='C$'+price+'<br>'+"2 hours";
    });
    })

  })

}
   /* Set the width of the side navigation to 250px */
   function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
      
   