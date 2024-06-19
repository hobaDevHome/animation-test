// Function to handle wheel spinning

function spinWheel() {
  // Simulate server request (replace with actual fetch request)
  fetch("server.json")
    .then((response) => response.json())
    .then((data) => {
      const position = data.POSITION;
      const wheel = document.querySelector(".wheel");

      // Ensure wheel is an HTMLImageElement to access style property
      if (wheel instanceof HTMLImageElement) {
        // Simulate spinning animation (replace with actual animation logic)
        let rotation = 0;
        const interval = setInterval(() => {
          rotation += 10; // Adjust speed of rotation
          wheel.style.transform = `rotate(${rotation}deg)`;

          if (rotation >= 360) {
            rotation = 0;
            clearInterval(interval);
            // Display result based on position
            alert(`Wheel stopped at position ${position}`);
          }
        }, 50); // Adjust interval for smoother animation
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
