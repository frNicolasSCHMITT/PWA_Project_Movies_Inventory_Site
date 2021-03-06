// OFFLINE MODE

function onlineCheck() {
  if (navigator.onLine) {
    document.location.href = "/index.html";
  } else {
    document.location.href = "/offline.html";
  }
}
window.addEventListener("online", onlineCheck);
window.addEventListener("offline", onlineCheck);

//

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js");
}

// INSTALL BANNER

let deferredPrompt;
const addBtn = document.querySelector(".app-banner");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});

// GEOLOCALISATION

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(setCurrentPosition, positionError, {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 0,
  });
}

function setCurrentPosition(position) {
  // document.querySelector(".accuracy").innerHTML = position.coords.accuracy;
  // document.querySelector(".altitude").innerHTML = position.coords.altitude;
  // document.querySelector(".altitudeAccuracy").innerHTML =
  //   position.coords.altitudeAccuracy;
  // document.querySelector(".heading").innerHTML = position.coords.heading;
  document.querySelector(".latitude").innerHTML = position.coords.latitude;
  document.querySelector(".longitude").innerHTML = position.coords.longitude;
  // document.querySelector(".speed").innerHTML = position.coords.speed;
  // document.querySelector(".cineMap").innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2773.493198611871!2d5.354740315574182!3d45.96140797910984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b519a39757e71%3A0x52cb524039ea3595!2sCin%C3%A9%20Festival!5e0!3m2!1sfr!2sfr!4v1636108841033!5m2!1sfr!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
}

// ERROR HANDLING

function positionError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;

    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;

    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;

    case error.UNKNOWN_ERROR:
      console.error("An unknown error occurred.");
      break;
  }
}
