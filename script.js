const searchform=document.querySelector('form');
const moviebox=document.querySelector('.main-box');
const inputbox=document.querySelector('.inputbox');

const ShowMovieData = (data) => {
    moviebox.innerHTML="";
    moviebox.classList.remove('nobackground')
    const { Title, imdbRating, Genre, Released,Runtime,Actors,Plot,Poster} = data;
    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;
    const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML=element;
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML+=`<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p>
                            <p><strong>Overview:</strong>${Plot}</p>`;
    const moviePosterElement=document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`

    moviebox.appendChild(moviePosterElement);
    moviebox.appendChild(movieElement);
    
    
}
const  getMovieInfo = async (movie) =>{
    try{
    const MyApiKey="51e283ae";
    const ApiUrl=` https://www.omdbapi.com/?apikey=${MyApiKey}&t=${movie}`;
    const response= await fetch(ApiUrl);
    if (!response.ok){
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    ShowMovieData(data);
    }
    catch(error){
        alert('No Movie Found ');
    }
}
searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const moviename=inputbox.value.trim();
    if(moviename!==''){
        moviebox.innerHTML=`<h2>Fetching Movie</h2>`;
        moviebox.classList.add('nobackground')
        getMovieInfo(moviename);
    }
    else{
        alert('Please Enter Movie Name');
        moviebox.classList.add('nobackground')
    }
});
