
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

document.addEventListener("keydown", function(e) {

    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
    }


    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
    }


    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
    }

    if (e.key === "F12") {
        e.preventDefault();
    }
});



const audio = document.getElementById("bgMusic");
const volumeIcon = document.getElementById("volumeIcon");
const volumeControl = document.getElementById("volumeControl");
const volumeSlider = document.getElementById("volume");


volumeIcon.addEventListener("click", () => {
  volumeControl.style.display = 
    volumeControl.style.display === "block" ? "none" : "block";
});

volumeSlider.addEventListener("input", () => {
  audio.muted = false;
  audio.volume = volumeSlider.value;
});

document.body.addEventListener("click", () => {
  audio.muted = false;
  audio.play();
}, { once: true });

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; 


  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("clock").innerText =
    hours + ":" + minutes + ":" + seconds + " " + ampm;
}

setInterval(updateClock, 1000);
updateClock();

const titleText = "p l d 1 3 1 2 - L a i D u c";
let direction = 1;
let i = 0; 

function animateTitle() {
  if (direction === 1) {
    i++;
    if (i > titleText.length) {
      direction = -1;
      setTimeout(animateTitle, 1000); 
      return;
    }
  } else {
    i--;
    if (i < 0) {
      direction = 1;
      setTimeout(animateTitle, 500);
      return;
    }
  }

  document.title = titleText.substring(0, i);
  setTimeout(animateTitle, 150);
}

animateTitle();

