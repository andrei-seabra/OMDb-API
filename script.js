let totalEpisodes = 0;
let totalSeasons;

function showHeaderInformation(series) {
    document.querySelector("#series-title").textContent = `${series.Title}`;
    document.querySelector("#series-poster").src = `${series.Poster}`;
    document.querySelector("#series-year").textContent = `${series.Year}`;
    document.querySelector("#series-rating").innerHTML = `<i class="fa-brands fa-imdb"></i> ${series.imdbRating}`;
    document.querySelector("#series-genre").textContent = `${series.Genre}`;
    document.querySelector("#series-language").textContent = `${series.Language}`;
    document.querySelector("#series-plot").textContent = `${series.Plot}`;

    totalSeasons = series.totalSeasons;
}

function getTotalEpisodes(season) {
    if (season.Episodes.length > totalEpisodes) {
        totalEpisodes = season.Episodes.length;
    }
}

function showEpisodesMatrix(series) {
    const episodesMatrix = document.querySelector("#episodes-matrix");
    episodesMatrix.style.gridTemplateRows = `repeat(${++totalSeasons}, 1fr)`;

    for (let i = 1; i < totalSeasons; i++) {
        fetch(`https://www.omdbapi.com/?apikey=90019fb6&i=tt0903747&Season=${i}`)
            .then(response => response.json())
            .then(season => {
                getTotalEpisodes(season);
                episodesMatrix.style.gridTemplateColumns = `repeat(${++totalEpisodes}, 1fr)`;

                season.Episodes.forEach(episode => {
                    const rating = episode.imdbRating;

                    const episodeCard = document.createElement("p");
                    episodeCard.classList.add("episode");
                    episodeCard.textContent = `${rating}`;

                    if (rating >= 9) {
                        episodeCard.classList.add("great");
                    } else if (rating >= 8) {
                        episodeCard.classList.add("good");
                    } else if (rating >= 6) {
                        episodeCard.classList.add("regular");
                    } else if (rating > 4) {
                        episodeCard.classList.add("bad");
                    } else {
                        episodeCard.classList.add("terrible");
                    }

                    episodesMatrix.appendChild(episodeCard);
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    showEpisodeNumbers(episodesMatrix);
}

fetch("https://www.omdbapi.com/?apikey=90019fb6&i=tt0903747")
    .then(response => response.json())
    .then(series => {
        showHeaderInformation(series);
        showEpisodesMatrix(series);
    })
    .catch(error => {
        console.log(error);
    })