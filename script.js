var spinning = false;

// Get references to the audio elements
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

// Function to play spin sound effect
function playSpinSound() {
  if (spinSound instanceof HTMLAudioElement) {
    spinSound.currentTime = 0;
    spinSound.play();
  }
}

// Function to play win sound effect
function playWinSound() {
  if (winSound instanceof HTMLAudioElement) {
    winSound.currentTime = 0;
    winSound.play();
  }
}

// Function to handle wheel spinning
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
        var numberOfSpins = 5; // Change this number to affect the number of full spins
        // Calculate the rotation angle based on the random position
        var angle = getAngleForPosition(randomPosition) + 360 * numberOfSpins; // Adding extra spins

        // Spin the wheel to the calculated angle
        wheel.style.transition = "transform 9s ease-out"; // Adjust duration as needed
        wheel.style.transform = "rotate(" + angle + "deg)";
        setTimeout(function () {
          playWinSound();
          updateLoadMessage(randomPosition);
        }, 9000);

        // Add an event listener for the transition end to reset the spinning state
        wheel.addEventListener(
          "transitionend",
          function () {
            spinning = false; // Reset spinning state
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

// Function to update the 'load' element's innerHTML
function updateLoadMessage(position) {
  var loadElement = document.getElementById("load");
  if (loadElement) {
    loadElement.innerHTML = "Wheel stopped at position " + position;
  }
}

// Initial call to update the load message
updateLoadMessage("Loading...");
