function showHeaderInformation(series) {
    document.querySelector("#series-title").textContent = `${series.Title}`;
    document.querySelector("#series-poster").src = `${series.Poster}`;
    document.querySelector("#series-year").textContent = `${series.Year}`;
    document.querySelector("#series-rating").innerHTML = `<i class="fa-brands fa-imdb"></i> ${series.imdbRating}`;
    document.querySelector("#series-genre").textContent = `${series.Genre}`;
    document.querySelector("#series-language").textContent = `${series.Language}`;
}

function showEpisodesMatrix(series) {

}

fetch("https://www.omdbapi.com/?apikey=90019fb6&i=tt0903747&plot=full")
    .then(response => response.json())
    .then(series => {
        showHeaderInformation(series);
        showEpisodesMatrix(series);
    })
    .catch(error => {
        console.log(error);
    })