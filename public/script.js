document.getElementById('form').addEventListener('submit', function (event) {

    const breed = document.getElementById('type').value;

    // Post request to Dog API.
    axios.post('/', { type: breed })
      .then(response => {
        // Retrieving dog description.
        const dogInfo = response.data[0]; // Assuming the response is an array with a single object containing dog information
        // Displaying dog information.
        document.getElementById('dogDescription').textContent = dogInfo.description;
        // Making dog information 'visible'.
        document.getElementById('dog-info').classList.add('visible');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to retrieve dog information. Please try again later.');
      });
});
