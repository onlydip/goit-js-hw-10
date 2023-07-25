import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function toggleElement(e, s) {
  e.style.display = s ? "block" : "none";
}

function initialPage() {
  toggleElement(breedSelect, false); 
  toggleElement(loader, true); 
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      toggleElement(loader, false);
      toggleElement(breedSelect, true);
    })
    .catch(error => {
      showError("FAIL!!!! Try AGAIN to reloading the page!");
      toggleElement(loader, false);
    });
}

function showError(message) {
  error.textContent = message;
    error.style.display = "block";
    
}

function clearError() {
  error.style.display = "none";
}

breedSelect.addEventListener("change", () => {
  catInfo.innerHTML = "";
  clearError();
  const selectedBreedId = breedSelect.value;
  toggleElement(loader, true);

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      const image = document.createElement("img");
      image.src = cat.url;

      const catName = document.createElement("p");
      catName.textContent = `Breed: ${cat.breeds[0].name}`;

      const catDescription = document.createElement("p");
      catDescription.textContent = `Description: ${cat.breeds[0].description}`;

      const catTemperament = document.createElement("p");
      catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

      catInfo.appendChild(image);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      toggleElement(loader, false);
    })
    .catch(error => {
      showError("FAIL!!!! Try AGAIN to reloading the page!");
      toggleElement(loader, false);
    });
});

initialPage();