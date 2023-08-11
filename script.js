import { fetchApi } from "./fetch.js";

let popularidad=[];
let nombre=[];

const rgbaRedColor='rgba(255, 99, 132, 0.2)'
const rgbRedColor='rgba(255, 99, 132)'

const rgbaOrangeColor='rgba(255, 159, 64, 0.2)';
const rgbOrangeColor='rgba(255, 159, 64)'



async function renderData(){

  const movies = await fetchApi('https://api.themoviedb.org/3/movie/top_rated?api_key=bf18d2cb4cf1bb2f31e5f038bd3612af&page=1');
console.log(movies);

const moviesToRemove = 569094; // ID de la película que deseas eliminar

// índice de la película que eliminar
const indexToRemove = movies.results.findIndex(movie => movie.id === moviesToRemove);

if (indexToRemove !== -1) {
  // Uso de splice() para eliminar la película del arreglo
  movies.results.splice(indexToRemove, 1);
}

// Manipulación de datos siguiente
movies.results.forEach(movie => {
  popularidad.push(movie.popularity);
  nombre.push(movie.title);
});

console.log(popularidad);
console.log(nombre);


//     const movies=await fetchApi('https://api.themoviedb.org/3/movie/top_rated?api_key=bf18d2cb4cf1bb2f31e5f038bd3612af&page=1');
//     console.log(movies);
//     movies.results.forEach(movie=>{
//         popularidad.push(movie.popularity);
//         nombre.push(movie.title);
//     });
//     const elementToRemove = 12;
// // Filtrar el arreglo para eliminar el elemento
// const newArray = movies.results.filter(item => item !== elementToRemove);
//     console.log(popularidad);
//     console.log(nombre);

const backgroundColors=popularidad.map(popularity=> popularity>3?rgbaRedColor:rgbaOrangeColor);
const borderColors=popularidad.map(popularity=> popularity>3?rgbRedColor:rgbOrangeColor);
console.log(backgroundColors);

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'Movies popularity',
        data: popularidad,
        borderWidth: 1,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
            display: true,
            text: 'Movies Popularity'
        },
    }
    }

  });
}   
renderData();

      
