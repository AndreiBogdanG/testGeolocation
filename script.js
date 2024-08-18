document.addEventListener("DOMContentLoaded", function() {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
        const myParagraph = document.getElementById('paragraf');

        // Request the user's current position
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Successfully retrieved the position
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var accuracy = position.coords.accuracy;

                myParagraph.innerText = `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;

                console.log("Latitude: " + latitude);
                console.log("Longitude: " + longitude);
                console.log("Accuracy: " + accuracy + " meters");
            },
            function(error) {
                // Handle errors
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        myParagraph.innerText = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        myParagraph.innerText = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        myParagraph.innerText = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknown error occurred.");
                        myParagraph.innerText = "An unknown error occurred.";
                        break;
                }
            },
            {
                enableHighAccuracy: true, // Request the most accurate position available
                timeout: 10000,           // Wait up to 10 seconds for the location
                maximumAge: 0             // Do not use a cached position
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        document.getElementById('paragraf').innerText = "Geolocation is not supported by this browser.";
    }
});