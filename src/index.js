document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    // Fetch dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            renderBreeds(allBreeds);
        })
        .catch(error => console.error('Error fetching breeds:', error));

    // Function to render breeds
    function renderBreeds(breeds) {
        const breedList = document.getElementById('dog-breeds');
        breedList.innerHTML = ''; // Clear the existing list
        breeds.forEach(breed => {
            const liElement = document.createElement('li');
            liElement.textContent = breed;

            // Add click event listener to change font color
            liElement.addEventListener('click', () => {
                liElement.style.color = 'blue'; 
            });

            breedList.appendChild(liElement);
        });
    }

    // Event listener for dropdown to filter breeds
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
});
