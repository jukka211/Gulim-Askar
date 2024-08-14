let displayDistance = 200; // Default distance in px to display another photo
let nDisplay = 15; // Default number of pictures to display at once

// Check if the screen width is 768px or less
if (window.innerWidth <= 768) {
    nDisplay = 4; // Number of pictures to display at once on mobile
}

// Function to update displayDistance based on screen size
function updateDisplayDistance() {
    if (window.matchMedia("(min-width: 2200px)").matches) {
        displayDistance = 400;
    } else {
        displayDistance = 200;
    }
}

// Call the function initially
updateDisplayDistance();

// Add an event listener for screen resizing
window.addEventListener('resize', updateDisplayDistance);

const images = document.getElementsByClassName("image");

let globalIndex = 0; // used to count up the images
let lastMousePosition = {x: 0, y: 0}; // used to get the last mouse/touch position

// function to activate photos
function activatePic(img, x, y) {
    // Reset the scale of all images
    for (let i = 0; i < images.length; i++) {
        images[i].style.transform = "translate(-50%, -50%) scale(0.5)";
    }

    // Activate the current image and scale it up
    img.dataset.status = "active";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = globalIndex; // otherwise the last pic will always be at the top
    img.style.transform = "translate(-50%, -50%) scale(1.25)"; // Scale up the active image
    lastMousePosition = {x: x, y: y}; // update the last mouse/touch position
}

// compute distance between current and last position
function computeDistance(x, y) {
    return Math.hypot(x - lastMousePosition.x, y - lastMousePosition.y);
}

// Handle mousemove
window.onmousemove = e => {
    handleMoveEvent(e.clientX, e.clientY);
}

// Handle touchstart
window.ontouchstart = e => {
    if (e.touches.length === 1) { // Single touch
        const touch = e.touches[0];
        handleMoveEvent(touch.clientX, touch.clientY);
    }
}

// Handle touchmove
window.ontouchmove = e => {
    if (e.touches.length === 1) { // Single touch
        const touch = e.touches[0];
        handleMoveEvent(touch.clientX, touch.clientY);
    }
}

// Function to handle both mouse and touch events
function handleMoveEvent(x, y) {
    if (computeDistance(x, y) > displayDistance) {
        let activePic = images[globalIndex % images.length];
        let inactivePic = images[(globalIndex - nDisplay) % images.length];

        activatePic(activePic, x, y);
        if (inactivePic) {
            inactivePic.dataset.status = "inactive";
        }

        globalIndex++;
    }
}
