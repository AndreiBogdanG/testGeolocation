document.addEventListener("DOMContentLoaded", function() {
    const myParagraph = document.getElementById('paragraf');
    const button = document.getElementById('getLocation');
   

    button.addEventListener('click', function() {
        // Check if Geolocation is supported
        if ("geolocation" in navigator) {
            // Request permission for geolocation
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Success: User granted permission
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var accuracy = position.coords.accuracy;

                    // myParagraph.innerText = `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;


                    // distance in meters  (next lines)
                   
                    const lat2 = 44.4409061, lon2 =  26.09277    // hotel Park Inn

                    let distance = haversineDistance(latitude, longitude, lat2, lon2);
                    if (distance >= 1000) {
                        distance = distance/1000;
                        myParagraph.innerText = `Latitude: ${latitude}\nLongitude: ${longitude}\nDistance to Park Inn: ${distance.toFixed(2)} km`;
                        console.log(`Distance to Park Inn: ${distance.toFixed(2)} km`);
                    } else {
                        myParagraph.innerText = `Latitude: ${latitude}\nLongitude: ${longitude}\nDistance to Park Inn: ${distance.toFixed(2)} meters`;
                    }


                    const query = encodeURIComponent(`${latitude}, ${longitude}`);
                    const url = `https://www.google.com/search?q=${query}`;


                    const mapButton = document.getElementById('showOnMap');

                    mapButton.addEventListener('click', function() {
                   
                    const query = encodeURIComponent(`${latitude}, ${longitude}`);
                    const url = `https://www.google.com/search?q=${query}`;
                    window.open(url, '_blank');
                
                });
            

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
            myParagraph.innerText = "Geolocation is not supported by this browser.";
        }

        
    });


});


//......................................

function haversineDistance(lat1, lon1, lat2, lon2) {
const R = 6371000; // Earth's radius in meters
const toRadians = angle => angle * (Math.PI / 180);

const dLat = toRadians(lat2 - lat1);
const dLon = toRadians(lon2 - lon1);
const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
const distance = R * c;

return distance;
}
