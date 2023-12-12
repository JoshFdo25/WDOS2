//=====================================Javascript for Room booking==================================

let currentBooking = {};
let currentBookingCost = 0;
let overallBooking = [];
let overallBookingCost = [];
let loyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints')) || 0;

document.addEventListener('input', function() {
    calculateCost();
});

document.addEventListener('DOMContentLoaded', function() {
    displayLoyaltyPoints();
});

function calculateCost() {
    const roomType = document.querySelector('input[name="roomType"]:checked').value;
    const noOfRooms = parseInt(document.getElementById("noOfRooms").value);
    const stayDuration = parseInt(document.getElementById("stayDuration").value);
    const noOfAdults = parseInt(document.getElementById("noOfAdults").value);
    const noOfChildren = parseInt(document.getElementById("noOfChildren").value);
    const wiFi = document.getElementById("wiFi").checked;
    const poolView = document.getElementById("poolView").checked;
    const gardenView = document.getElementById("gardenView").checked;
    const extraBed = document.getElementById("extraBed").checked;
    const promoCode = document.getElementById("promoCode").value;

    let baseCost = 0;

    switch (roomType) {
        case 'single':
            baseCost = 25000;
            break;
        case 'double':
            baseCost = 35000;
            break;
        case 'triple':
            baseCost = 40000;
            break;
        default:
            break;
    }

    const wifiCost = wiFi ? 1000 : 0;
    const poolViewCost = poolView ? 2000 : 0;
    const gardenViewCost = gardenView ? 1500 : 0;
    const extraBedCost = extraBed ? 8000 : 0;

    let discount = 0;

    if (promoCode === 'Promo123'){
        discount = 0.05;
    }

    const totalCostBeforeDiscount = baseCost*noOfRooms*stayDuration + noOfChildren* 5000 + wifiCost + poolViewCost + gardenViewCost + extraBedCost;

    const totalCost = totalCostBeforeDiscount - (totalCostBeforeDiscount * discount);


    currentBooking = {
        roomType,
        noOfRooms,
        stayDuration,
        noOfAdults,
        noOfChildren,
        wiFi,
        poolView,
        gardenView,
        extraBed,
        promoCode,
        totalCost
    };

    currentBookingCost = totalCost;

    displayCurrentBooking();
    displayCurrentBookingCost();
    displayLoyaltyPoints();
}

function displayCurrentBooking() {
    const currentBookingDiv = document.getElementById('currentBooking');
    currentBookingDiv.innerHTML = `<strong>Current Booking:</strong> Room Type: ${currentBooking.roomType}, 
        Number of Rooms: ${currentBooking.noOfRooms}, 
        Number of Nights: ${currentBooking.stayDuration}`;
}

function displayCurrentBookingCost() {
    const currentBookingCostDiv = document.getElementById('currentBookingCost');
    currentBookingCostDiv.innerHTML = `<strong>Current Booking Cost:</strong> LKR ${currentBookingCost}`;
}

function bookNow() {
    const nameField = document.getElementById("name");
    const nameValue = nameField.value; // Trim to remove leading/trailing spaces
    if (nameValue === "") {
        // Display an alert or an error message
        alert("Name is required. Please enter your name.");
        return;} // Stop further execution

    const emailField = document.getElementById("email");
    const emailValue = emailField.value; // Trim to remove leading/trailing spaces
    if (emailValue === "") {
        // Display an alert or an error message
        alert("Email is required. Please enter your Email.");
        return;} // Stop further execution

    const roomCheckIn = document.getElementById("roomCheckIn");
    const roomCheckInValue = roomCheckIn.value; // Trim to remove leading/trailing spaces
    if (roomCheckInValue === "") {
        // Display an alert or an error message
        alert("Please select a Check-In date.");
        return;} // Stop further execution


    overallBooking.push(currentBooking);
    overallBookingCost.push(currentBookingCost);

    displayOverallBooking();
    displayOverallBookingCost();

    updateLoyaltyPoints();
    displayLoyaltyPoints();

    currentBooking = {};
    currentBookingCost = 0;

    resetRoomBookingForm();
    
    displayCurrentBooking();
    displayCurrentBookingCost();
}

function addToFavorites() {
    // Save the current booking to local storage as a favorite
    localStorage.setItem('favoriteBooking', JSON.stringify(currentBooking));
    alert('Current booking added to Favorites!');
}

function displayOverallBooking() {
    const overallBookingDiv = document.getElementById('overallBooking');
    let bookingsString = "<strong>Overall Booking:</strong><br>";

    for (const booking of overallBooking) {
        bookingsString += `Room Type: ${booking.roomType}, No. of Rooms: ${booking.noOfRooms}, 
        No. of Nights: ${booking.stayDuration}, Promo Code: "${booking.promoCode}"<br>`;
    }

    overallBookingDiv.innerHTML = bookingsString;
}

function displayOverallBookingCost() {
    const overallBookingCostDiv = document.getElementById('overallBookingCost');

    const totalOverallBookingCost = overallBookingCost.reduce((total, cost) => total + cost, 0);

    overallBookingCostDiv.innerHTML = `<strong>Overall Booking Cost:</strong> LKR ${totalOverallBookingCost}`;
}

function displayLoyaltyPoints() {
    const loyaltyPointsInput = document.getElementById('loyaltyPoints');
    loyaltyPointsInput.value = loyaltyPoints.toString();
}

function updateLoyaltyPoints() {
    const noOfRoomsInCurrentBooking = currentBooking.noOfRooms;

    if (noOfRoomsInCurrentBooking > 3) {
        const loyaltyPointsEarned = 20 * noOfRoomsInCurrentBooking;
        loyaltyPoints += loyaltyPointsEarned;
        localStorage.setItem('loyaltyPoints', loyaltyPoints.toString());
        displayLoyaltyPoints();
        alert(`Congratulations! You've earned ${loyaltyPointsEarned} loyalty points.`);
    }
}

function resetRoomBookingForm() {
    const roomBookingForm = document.getElementById('bookingForm');
    const formElements = roomBookingForm.elements;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.id !== 'loyaltyPoints') {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = false;
            } else if (element.type !== 'button') {
                element.value = '';
            }
        }
    }
}


//====================================Javascript for Adventure Booking================================

let currentAdvBooking = {};
let currentAdvBookingCost = 0;
let overallAdvBooking = [];
let overallAdvBookingCost = [];

document.addEventListener('input', function() {
    calculateAdvCost();
});

function calculateAdvCost(){
    const guideCheckboxes = document.querySelectorAll('input[name="guide"]:checked');
    const advBookingHours = parseInt(document.getElementById('advBookingHours').value);
    const localAdults = parseInt(document.getElementById('localAdults').value);
    const localKids = parseInt(document.getElementById('localKids').value);
    const foreignAdults = parseInt(document.getElementById('foreignAdults').value);
    const foreignKids = parseInt(document.getElementById('foreignKids').value);

    let guideCost = 0;

    guideCheckboxes.forEach(checkbox => {
        switch (checkbox.value) {
            case 'noGuide':
                guideCost += 0;
                break;
            case 'adultGuide':
                guideCost += 1000;
                break;
            case 'kidGuide':
                guideCost += 500;
                break;
            default:
                break;
        }
    });

    const localAdultsCost = localAdults ? 5000 : 0;
    const localKidsCost = localKids ? 2000 : 0;
    const foreignAdultsCost = foreignAdults ? 10000 : 0;
    const foreignKidsCost = foreignKids ? 5000 : 0; 2

    const totalAdvCost = guideCost + (localAdultsCost*localAdults + localKidsCost*localKids + foreignAdultsCost*foreignAdults + foreignKidsCost*foreignKids)*advBookingHours; 

    currentAdvBooking = {
        advBookingHours,
        localAdults,
        localKids,
        foreignAdults,
        foreignKids,
        guide: Array.from(guideCheckboxes).map(checkbox => checkbox.value),
        guideCost,
        totalAdvCost
    };

    currentAdvBookingCost = totalAdvCost;

    displayCurrentAdvBooking();
    displayCurrentAdvBookingCost();
}

function displayCurrentAdvBooking() {
    const currentAdvBookingDiv = document.getElementById('currentAdvBooking');
    currentAdvBookingDiv.innerHTML = `<strong>Current Booking:</strong> Local Adults: ${currentAdvBooking.localAdults ?? 0}, 
    Local Kids: ${currentAdvBooking.localKids ?? 0}, 
    Foreign Adults: ${currentAdvBooking.foreignAdults ?? 0}
    Foreign Kids: ${currentAdvBooking.foreignKids ?? 0}
    No. of Hours: ${currentAdvBooking.advBookingHours}
    Guide Cost: ${currentAdvBooking.guideCost}`;
}

function displayCurrentAdvBookingCost() {
    const currentAdvBookingCostDiv = document.getElementById('currentAdvBookingCost');
    currentAdvBookingCostDiv.innerHTML = `<strong>Current Booking Cost:</strong> LKR ${currentAdvBookingCost}`;
}

function advBookNow() {
    const advNameField = document.getElementById("advBookingName");
    const advNameValue = advNameField.value;
    if (advNameValue === "") {
        // Display an alert or an error message2
        alert("Name is required. Please enter your name.");
        return;} // Stop further execution

    const advEmailField = document.getElementById("advBookingEmail");
    const advEmailValue = advEmailField.value;
    if (advEmailValue === "") {
        // Display an alert or an error message
        alert("Email is required. Please enter your Email.");
        return;} // Stop further execution

    const advDate = document.getElementById("advBookingDate");
    const advDateValue = advDate.value;
    if (advDateValue === "") {
        // Display an alert or an error message
        alert("Please select a Check-In date.");
        return;} // Stop further execution


    overallAdvBooking.push(currentAdvBooking);
    overallAdvBookingCost.push(currentAdvBookingCost);

    displayOverallAdvBooking();
    displayOverallAdvBookingCost();

    currentAdvBooking = {};
    currentAdvBookingCost = 0;

    displayCurrentAdvBooking();
    displayCurrentAdvBookingCost();

    resetAdvBookingForm()
}

function advAddToFavorites() {
    // Save the current booking to local storage as a favorite
    localStorage.setItem('favoriteAdvBooking', JSON.stringify(currentAdvBooking));
    alert('Current booking added to Favorites!');
}

function displayOverallAdvBooking() {
    const overallAdvBookingDiv = document.getElementById('overallAdvBooking');
    let advBookingsString = "<strong>Overall Booking:</strong><br>";

    for (const advBooking of overallAdvBooking) {
        advBookingsString += `Local Adults: ${advBooking.localAdults}, Local Kids: ${advBooking.localKids}, 
        Foreign Adults: ${advBooking.foreignAdults}, Foreign Kids: ${advBooking.foreignKids}, No. of Hours: ${advBooking.advBookingHours}, Guide: ${advBooking.guide}<br>`;
    }

    overallAdvBookingDiv.innerHTML = advBookingsString;
}

function displayOverallAdvBookingCost() {
    const overallAdvBookingCostDiv = document.getElementById('overallAdvBookingCost');

    const totalOverallAdvBookingCost = overallAdvBookingCost.reduce((total, cost) => total + cost, 0);

    overallAdvBookingCostDiv.innerHTML = `<strong>Overall Booking Cost:</strong> LKR ${totalOverallAdvBookingCost}`;
}

function resetAdvBookingForm() {
    const advBookingForm = document.getElementById("advBookingForm");
    advBookingForm.reset();
}