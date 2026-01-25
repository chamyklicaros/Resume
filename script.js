// Get elements
const modal = document.querySelector('.modal');
const userIcon = document.querySelector('.img-container');
const closeBtn = document.querySelector('.X');
const dateTimeDisplay = document.querySelector('.dateTime');
const modalHeader = document.querySelector('.modal-top-aboutMe');

// Hide modal initially
modal.style.display = 'none';

// Open modal when user icon is double-clicked
userIcon.addEventListener('dblclick', () => {
    modal.style.display = 'flex';
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Make CV icon draggable
let isDraggingIcon = false;
let iconCurrentX;
let iconCurrentY;
let iconInitialX;
let iconInitialY;
let iconXOffset = 0;
let iconYOffset = 0;

userIcon.addEventListener('mousedown', iconDragStart);
document.addEventListener('mousemove', iconDrag);
document.addEventListener('mouseup', iconDragEnd);

function iconDragStart(e) {
    iconInitialX = e.clientX - iconXOffset;
    iconInitialY = e.clientY - iconYOffset;
    isDraggingIcon = true;
}

function iconDrag(e) {
    if (isDraggingIcon) {
        e.preventDefault();
        iconCurrentX = e.clientX - iconInitialX;
        iconCurrentY = e.clientY - iconInitialY;
        iconXOffset = iconCurrentX;
        iconYOffset = iconCurrentY;
        
        userIcon.style.left = `${20 + iconCurrentX}px`;
        userIcon.style.top = `${20 + iconCurrentY}px`;
    }
}

function iconDragEnd() {
    isDraggingIcon = false;
}

// Make modal draggable
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

modalHeader.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    if (e.target === closeBtn) return;
    
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    isDragging = true;
    modalHeader.style.cursor = 'grabbing';
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        
        modal.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    }
}

function dragEnd() {
    isDragging = false;
    modalHeader.style.cursor = 'grab';
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedDateTime = `${dayName}, ${monthName} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    dateTimeDisplay.textContent = formattedDateTime;
}

// Update time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);