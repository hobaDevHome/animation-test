let spinning = false;

async function spinWheel() {
  if (spinning) return;
  spinning = true;

  try {
    const response = await fetch("positions.json");
    const data = await response.json();
    const positions = data.positions;

    // Get a random position from the array
    const randomPosition =
      positions[Math.floor(Math.random() * positions.length)];

    const wheel = document.getElementById("wheel");
    if (wheel) {
      const numberOfSpins = 3;
      // Calculate the rotation angle based on the random position
      const angle = getAngleForPosition(randomPosition) + 360 * numberOfSpins; // Adding extra spins

      // Spin the wheel to the calculated angle
      wheel.style.transform = `rotate(${angle}deg)`;

      // Add an event listener for the transition end to reset the spinning state
      wheel.addEventListener(
        "transitionend",
        () => {
          spinning = false;
          wheel.style.transition = "none";
          wheel.style.transform = `rotate(${getAngleForPosition(
            randomPosition
          )}deg)`; // Set to final angle
          setTimeout(() => {
            wheel.style.transition = "transform 2s ease-out"; // Reapply transition for next spin
          }, 0);
        },
        { once: true }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    spinning = false; // Reset spinning state in case of an error
  }
}

// Function to map position to angle
function getAngleForPosition(position) {
  const positionAngles = {
    1: 0,
    2: 90,
    3: 180,
    4: 270,
  };
  return positionAngles[position] || 0;
}
