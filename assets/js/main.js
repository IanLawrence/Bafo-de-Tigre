var onDeviceReady = function() {
        destinationType=navigator.camera.DestinationType;
};

function onSuccess(imageURI) {    
    //debugging 
    alert('Image ' + imageURI + 'was found!');
    console.log(imageURI);

    //document.getElementById("smallImage").src  = imageURI;
    //$('#smallImage').show();
    var image = document.getElementById("image")
    image.src = imageURI
    
    
}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            showFile(mediaFiles[i]);
      }       
}


function showFile(mediaFile) {
            var path = mediaFile.fullPath;
            var name = mediaFile.name;
            var image = document.getElementById("image")
            viewport.style.display = "";
            viewport.style.position = "absolute";
            viewport.style.top = "10px";
            viewport.style.left = "10px";
            image.src = path;
            image.value =  path;
            console.log('Image source: ' + path);
            console.log('Image value: ' + path);
            $('#image').show();

}
function show_pic() {
         //       navigator.camera.getPicture(onSuccess, onFail, { quality: 100, destinationType: destinationType.FILE_URI});
                  navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
}


// Called if something bad happens.
// 
function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
}

function onFail(message){
   alert('Failed because: ' + message);
}


function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}
