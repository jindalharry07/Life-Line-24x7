function openForm() {
    document.getElementById("myModal").style.display = "block";
}

function closeForm() {
    document.getElementById("myModal").style.display = "none";
}

function submitBooking() {
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const ambulanceType = document.querySelector('input[name="ambulance-type"]:checked').value;
    const booking = {
        location: location,
        phone: phone,
        ambulanceType: ambulanceType,
        time: new Date().toLocaleString() 
    };

    let bookings = JSON.parse(localStorage.getItem('ambulanceBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('ambulanceBookings', JSON.stringify(bookings));

    closeForm();
    document.getElementById("confirmationPopup").style.display = "block";
}

function closeConfirmation() {
    document.getElementById("confirmationPopup").style.display = "none";
}

window.onclick = function(event) {
    const bookingModal = document.getElementById("myModal");
    const confirmationModal = document.getElementById("confirmationPopup");

    if (event.target == bookingModal) {
        bookingModal.style.display = "none";
    }

    if (event.target == confirmationModal) {
        confirmationModal.style.display = "none";
    }
}

function emergencyBooking() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function sendLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const timestamp = new Date().toLocaleString();

    const emergencyBooking = {
        location: `Latitude: ${latitude}, Longitude: ${longitude}`,
        phone: 'N/A',  
        ambulanceType: 'Emergency',
        time: timestamp
    };

    let bookings = JSON.parse(localStorage.getItem('ambulanceBookings')) || [];
    bookings.push(emergencyBooking);

    localStorage.setItem('ambulanceBookings', JSON.stringify(bookings));

    alert(`Emergency Booking Confirmed!\nLocation: ${latitude}, ${longitude}\nTime: ${timestamp}`);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
