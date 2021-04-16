//Device position ---------------------
if ('DeviceOrientationEvent' in window) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
  document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler (eventData) {
  var tiltLR = eventData.gamma;
  var tiltFB = eventData.beta;
  var dir = eventData.alpha;
  
  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

}




//Geolocation ---------------------
var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
  target.appendChild(newLocation);
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
} else {
  target.innerText = 'Geolocation API not supported.'; 
}





//Button actions------------
let btnStartStop = document.getElementById("stop-btn");

let timerId;
//let key = 1; //если ключ по времени (1сек)

function startStopRecord() {
	if(timerId) {
	    clearInterval(timerId);
	    timerId = undefined;
	    btnStartStop.innerText = "Start";
	} else {
		interval = 1000;

		    timerId = setInterval(() => { 
		    	let obj1 = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				};

				let obj2 = {
					gamma: tiltLR,
					beta: tiltFB ,
					alpha: dir
				};

				let serialObj1 = JSON.stringify(obj1); //сериализуем его (ключ)
				let serialObj2 = JSON.stringify(obj2); //сериализуем его (значение)
				localStorage.setItem(serialObj1, serialObj2); //запишем его в хранилище по ключу
				let returnObj = JSON.parse(localStorage.getItem(obj2)) //спарсим его обратно объект
				//key += 1; //если ключ по времени (1сек)
			}, interval);
		
		

	    	btnStartStop.innerText = "Stop";
	  }
}



function clearStorage() {
	localStorage.clear();
	alert("Хранилище данных очищено.");
}





//Save data in file
// (function(console){

//     console.save = function(data, filename){

//         if(!data) {
//             console.error('Console.save: No data')
//             return;
//         }

//         if(!filename) filename = 'console.json'

//         if(typeof data === "object"){
//             data = JSON.stringify(data, undefined, 4)
//         }

//         var blob = new Blob([data], {type: 'text/json'}),
//             e    = document.createEvent('MouseEvents'),
//             a    = document.createElement('a')

//         a.download = filename
//         a.href = window.URL.createObjectURL(blob)
//         a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
//         e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//         a.dispatchEvent(e)
//         console.save(data, [filename])
//     }
// })(console)
