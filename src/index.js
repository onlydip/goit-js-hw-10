import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select'


const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
// const loadertext = document.querySelector('.loader-text');


// function messageError() {
//   error.style.display = "block"; 
//   loader.style.display = "none"; 
// }
fetchBreeds().then(data => {
    breedSelect.innerHTML = createMarkup(data);

    }).catch(() => {
    showError();
}).finally(hideLoader());

function createMarkup(data) {
    return data.map(breed=>`<option value="${breed.id}">${breed.name}</option>`).join('');
};

function showLoader() {
    loader.style.display = "block";
    breedSelect.style.display = "none";
    catInfo.style.display = "none";
    error.style.display = "none";
};

function hideLoader() {
    loader.style.display = "none";
};

function showError() {
  loader.style.display = "none";
  breedSelect.style.display = "block";
  catInfo.style.display = "block";
  error.style.display = "block";
};

breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    showLoader();

    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            catInfo.innerHTML = createCatInfoMarkup(catData);
            hideLoader();
        }).catch(() => {
            showError();
        });


});


function createCatInfoMarkup(catData) {
    const { breed, description, temperament, url } = catData;
    return `<img src="${url}" alt="Cat">
    <h2>${breed.name}</h2>
    <p><b>Description:</b> ${description}</p>
    <p><b>Temperament:</b> ${temperament}</p>
    `
};