var spinning = false;
console.log("Script loaded");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

function isIE() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const trident = ua.indexOf("Trident/") > -1;
  console.log("is IE", msie);
  return msie || trident;
}

function handleBrowserDetection() {
  const pixiContainer = document.getElementById("myCanvas1");
  const pixiCanvas = document.getElementById("myCanvas");
  const fallbackContainer = document.getElementById("fallback-container");

  if (isIE()) {
    if (pixiContainer) pixiContainer.style.display = "none";
    if (pixiCanvas) pixiCanvas.style.display = "none";

    if (fallbackContainer) fallbackContainer.style.display = "block";
  } else {
    if (pixiContainer) pixiContainer.style.display = "flex";
    if (pixiCanvas) pixiCanvas.style.display = "flex";
    if (fallbackContainer) fallbackContainer.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", handleBrowserDetection);

function playSpinSound() {
  if (spinSound instanceof HTMLAudioElement) {
    spinSound.currentTime = 0;
    spinSound.play();
  }
}

function playWinSound() {
  if (winSound instanceof HTMLAudioElement) {
    winSound.currentTime = 0;
    winSound.play();
  }
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  playSpinSound();

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "positions.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      var positions = data.positions;

      // Get a random position from the array
      var randomPosition =
        positions[Math.floor(Math.random() * positions.length)];

      var wheel = document.getElementById("wheel");
      if (wheel) {
        var numberOfSpins = 5;
        // Calculate the rotation angle based on the random position
        var angle = getAngleForPosition(randomPosition) + 360 * numberOfSpins; // Adding extra spins

        // Spin the wheel to the calculated angle
        wheel.style.transition = "transform 9s ease-out";
        wheel.style.transform = "rotate(" + angle + "deg)";
        setTimeout(function () {
          playWinSound();
        }, 9000);

        wheel.addEventListener(
          "transitionend",
          function () {
            spinning = false;
          },
          { once: true }
        );
      }
    }
  };
  xhr.send();
}

// Function to map position to angle
function getAngleForPosition(position) {
  var positionAngles = {
    1: 0,
    2: 90,
    3: 180,
    4: 270,
  };
  return positionAngles[position] || 0;
}
