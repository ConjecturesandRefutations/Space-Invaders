background.src = "./images/locationOne.jpg";
 let currentColor = 'shipOne'; 

function handleLocationChange() {
  // Get the selected location radio input
  const selectedLocation = document.querySelector('input[name="location"]:checked').value;

  // Set background.src based on the selected location
  switch (selectedLocation) {
    case "locationOne":
      background.src = "./images/locationOne.jpg";
      break;
    case "locationTwo":
      background.src = "./images/locationTwo.jpg";
      break;
    case "locationThree":
      background.src = "./images/locationThree.jpg";
      break;
    default:
      // Handle the default case or provide a fallback image
      background.src = "./images/opening.jpg";
      break;
  }
}

 function handleShipChange(event) {
  event.stopPropagation();
    currentColor = event.target.value;
} 