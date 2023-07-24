import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_OwwC9I7ffhZYhIdliscGkYNkGoEADzwPmcOPM9QVIWU5QsCZZA2nPGJ0ZFrjvE8u";

 function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw new Error("Failed breeds.");
    });
}

 function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error("Failed cat.");
    });
}


export { fetchBreeds, fetchCatByBreed };