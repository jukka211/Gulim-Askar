const displayDistance = 100; // distance in px to display another photo
const nDisplay = 20; // number of pictures to display at once

const images = document.getElementsByClassName("image");

let globalIndex = 0; // used to count up the images
let lastMousePosition = {x: 0, y: 0}; // used to get the last mouse/touch position

// function to activate photos
function activatePic(img, x, y) {
    // Reset the scale of all images
    for (let i = 0; i < images.length; i++) {
        images[i].style.transform = "translate(-50%, -50%) scale(0.4)";
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
