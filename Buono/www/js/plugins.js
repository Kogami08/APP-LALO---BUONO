    // current GPS coordinates
    var color = ["FF0000","f90505", "25f905"];//del status bar
    var onSuccess = function(position) {//del GPS
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 

    
    function localizacion(){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }


    //STATUS BAR PLUGGIN

function cambiarColor(index){
    StatusBar.backgroundColorByHexString(color[index]);
    StatusBar.show();

    setTimeout(()=> {
        StatusBar.backgroundColorByHexString(color[2]);
        StatusBar.show();
    }, 2000);
    
}



    //CAMARA PLUGGIN

    function tomarFoto()
    {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL });
    }
    
    function onSuccess(imageData) {
        var image = document.getElementById('image');
        image.src = "data:image/jpeg;base64," + imageData;
        cambiarColor(2);
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
        cambiarColor(0);
    }