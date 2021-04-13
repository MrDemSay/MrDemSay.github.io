//btn-functions
function startRecordingData() {
  alert("Recording data -> start"); //status


function stopRecordingData() {
  alert("Recording data -> stop"); //status
};



//for Device position
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



//for 3D motion
  if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
    document.getElementById('moApi').innerHTML = 'Generic Sensor API';
    
    let lastReadingTimestamp;
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener('reading', e => {
      if (lastReadingTimestamp) {
        intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
      }
      lastReadingTimestamp = accelerometer.timestamp
      accelerationHandler(accelerometer, 'moAccel');
    });
    accelerometer.start();
    
    if ('GravitySensor' in window) {
      let gravity = new GravitySensor();
      gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
      gravity.start();
    }
    
    let gyroscope = new Gyroscope();
    gyroscope.addEventListener('reading', e => rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z
    }));
    gyroscope.start();
    
  } else if ('DeviceMotionEvent' in window) {
    document.getElementById('moApi').innerHTML = 'Device Motion API';
    
    var onDeviceMotion = function (eventData) {
      accelerationHandler(eventData.acceleration, 'moAccel');
      accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
      rotationHandler(eventData.rotationRate);
      intervalHandler(eventData.interval);
    }
    
    window.addEventListener('devicemotion', onDeviceMotion, false);
  } else {
    document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
  }

  function accelerationHandler(acceleration, targetId) {
    var info, xyz = "[X, Y, Z]";

    info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(2));
    info = info.replace("Y", acceleration.y && acceleration.y.toFixed(2));
    info = info.replace("Z", acceleration.z && acceleration.z.toFixed(2));
    document.getElementById(targetId).innerHTML = info;
  }

  function rotationHandler(rotation) {
    var info, xyz = "[X, Y, Z]";

    info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(2));
    info = info.replace("Y", rotation.beta && rotation.beta.toFixed(2));
    info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(2));
    document.getElementById("moRotation").innerHTML = info;
  }

  function intervalHandler(interval) {
    document.getElementById("moInterval").innerHTML = interval;
  }
};




//for Geolocation
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




//local storage
//Добавляем или изменяем значение:
localStorage.setItem('myKey', 'myValue'); //теперь у вас в localStorage хранится ключ "myKey" cо значением "myValue"

//Выводим его в консоль:
var localValue = localStorage.getItem('myKey');
console.log(localValue); //"myValue"

//удаляем:
localStorage.removeItem("myKey");

//очищаем все хранилище
localStorage.clear()

//То же самое, только с квадратными скобками:

localStorage["Ключ"] = "Значение" //установка значения
localStorage["Ключ"] // Получение значения
delete localStorage["Ключ"] // Удаление значения



//создадим объект
var obj = {
	item1: 1,
	item2: [123, "two", 3.0],
	item3:"hello"
};

var serialObj = JSON.stringify(obj); //сериализуем его

localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"

var returnObj = JSON.parse(localStorage.getItem("myKey")) //спарсим его обратно объект