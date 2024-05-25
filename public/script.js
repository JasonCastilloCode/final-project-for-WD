document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  const number = document.getElementById('type').value;

  // Post request to Dog API.
  axios.post('/', { type: number })
    .then(response => {
      // Retrieving image URL.
      const imageUrl = response.data.imageUrl;
      
      // Displaying the image.
      const dogImage = document.createElement('img');
      dogImage.src = imageUrl;
      dogImage.alt = 'Dog Image';
      
      // Clear previous image (if any) and append the new one.
      const descriptionBox = document.getElementById('dogDescription');
      descriptionBox.innerHTML = '';
      descriptionBox.appendChild(dogImage);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to retrieve dog image. Please try again later.');
    });
});
