// 1 Método da API
// Dados sem Repetição
// Chamada de métodos sem filtro
document.addEventListener("DOMContentLoaded", function () {
    var loadRandomDogButton = document.getElementById("loadRandomDog");
    loadRandomDogButton.addEventListener("click", loadRandomDogImage);
});
var xhr = new XMLHttpRequest();
function loadRandomDogImage() {
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            document.getElementById('pic').src = response.message;
        }
    };

    xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    xhr.send();
}

// 2 Métodos da API
// Dados com Repetição
// Chamada de métodos com filtro
function getBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            const breedSelect = document.getElementById("breedSelect");
            breedSelect.innerHTML = "";

            for (const breed in data.message) {
                const option = document.createElement("option");
                option.value = breed;
                option.text = breed;
                breedSelect.appendChild(option);
            }
        })
        .catch(error => console.error(error));
}

function getBreedImage() {
    const selectedBreed = document.getElementById("breedSelect").value;
    const dogImage = document.getElementById("pic");

    if (selectedBreed) {
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then(response => response.json())
            .then(data => {
                dogImage.src = data.message;
                dogImage.style.display = "block";
            })
            .catch(error => console.error(error));
    }
}

document.getElementById("getBreeds").addEventListener("click", getBreeds);
document.getElementById("getBreedImage").addEventListener("click", getBreedImage);

