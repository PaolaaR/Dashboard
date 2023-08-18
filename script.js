import { fetchApi } from "./fetch.js";

let popularidad=[];
let nombre=[];


async function renderData(){

  const movies = await fetchApi('https://api.themoviedb.org/3/movie/top_rated?api_key=bf18d2cb4cf1bb2f31e5f038bd3612af&page=1');


const moviesToRemove = 569094; // se decide eliminar Spider-Man: Across the Spider-Verse popularidad excede los parámetros del gráfico y es muy reciente

const indexToRemove = movies.results.findIndex(movie => movie.id === moviesToRemove);

if (indexToRemove !== -1) {
  // Uso de splice() para eliminar la película del arreglo
  movies.results.splice(indexToRemove, 1);
}


movies.results.forEach(movie => {
  popularidad.push(movie.popularity);
  nombre.push(movie.title);
});



const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'Movies popularity',
        data: popularidad,
        borderWidth: 3,
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 0, 8, 0.69)',
          'rgba(0, 160, 98, 0.7)',
          'rgba(153, 102, 270, 0.8)',
          'rgba(55, 159, 64, 0.7)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(255, 0, 255, 0.7)',
          'rgba(255, 147, 67, 0.7)',
          'rgba(0, 0, 0, 0.45)',
          'rgba(141, 216, 160, 0.86)',
          'rgba(153, 102, 265, 0.2)',
          'rgba(239, 136, 142, 0.86)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(255, 159, 74, 0.2)',
          'rgba(157, 230, 74, 0.86)',
          'rgba(126, 244, 240, 0.43)',
          'rgba(78, 47, 74, 0.43)',
          'rgba(255, 26, 26, 0.43)',
        ],
        borderColor: [
          'rgba(255, 26, 104)',
          'rgba(54, 162, 235)',
          'rgba(255, 0, 8)',
          'rgba(0, 160, 98)',
          'rgba(153, 102, 270)',
          'rgba(55, 159, 64)',
          'rgba(0, 0, 0, 0.3)',
          'rgba(255, 0, 255)',
          'rgba(255, 147, 67)',
          'rgba(0, 0, 0, 0.49)',
          'rgba(141, 216, 160)',
          'rgba(153, 102, 265)',
          'rgba(239, 136, 142)',
          'rgba(0, 0, 0)',
          'rgba(255, 159, 74)',
          'rgba(157, 230, 74)',
          'rgba(126, 244, 240)',
          'rgba(78, 47, 74)',
          'rgba(255, 26, 26)',
        ],
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

function applyPosterStyles() {
  const posters = document.querySelectorAll('.container .movie .poster');
  const backgroundColors = [
    'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 0, 8, 0.69)',
          'rgba(0, 160, 98, 0.7)',
          'rgba(153, 102, 270, 0.8)',
          'rgba(55, 159, 64, 0.7)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(255, 0, 255, 0.7)',
          'rgba(255, 147, 67, 0.7)',
          'rgba(0, 0, 0, 0.45)',
          'rgba(141, 216, 160, 0.86)',
          'rgba(153, 102, 265, 0.2)',
          'rgba(239, 136, 142, 0.86)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(255, 159, 74, 0.2)',
          'rgba(157, 230, 74, 0.86)',
          'rgba(126, 244, 240, 0.43)',
          'rgba(78, 47, 74, 0.43)',
          'rgba(255, 26, 26, 0.43)',
  ];

  posters.forEach((poster, index) => {
    poster.style.width = '90%';
    poster.style.marginBottom = '8px';
    poster.style.borderRadius = '12px';
    poster.style.border = `17px dotted ${backgroundColors[index % backgroundColors.length]}`;
    poster.style.backgroundColor = backgroundColors[index % backgroundColors.length];
  });
}

// Poster de las películas y descripciones

const loadMovies = async() => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=bf18d2cb4cf1bb2f31e5f038bd3612af&page=1`);

		if(response.status === 200){
			const datos = await response.json();
    	
			let movies = '';
			datos.results.forEach(movie => {
        if (movie.id !== 569094){
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.title}</h3>
            <p class="description">${movie.overview}</p>
					</div>
				`;
      }
			});

			document.getElementById('container').innerHTML = movies;
      
      applyPosterStyles();
		} else if(response.status === 401){
			console.log('You are not authorized');
		} else if(response.status === 404){
			console.log('We could not find what you are looking for');
		} else {
			console.log('Error');
		}

	} catch(error){
		console.log(error);
	}
};

loadMovies();





