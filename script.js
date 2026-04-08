let totalEpisodes = 0;
let loadedSeasons = 0;
let seasonsData = [];
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

function showEpisodesMatrix() {
    const episodesMatrix = document.querySelector("#episodes-matrix");

    for (let s = 1; s <= totalSeasons; s++) {
        fetch(`https://www.omdbapi.com/?apikey=90019fb6&i=tt0903747&Season=${s}`)
            .then(response => response.json())
            .then(season => {
                getTotalEpisodes(season);
                seasonsData[s - 1] = season;
                loadedSeasons++;

                if (loadedSeasons == totalSeasons) {
                    episodesMatrix.style.gridTemplateRows = `repeat(${++totalSeasons}, 1fr)`;
                    episodesMatrix.style.gridTemplateColumns = `repeat(${++totalEpisodes}, 1fr)`;

                    for (let e = 1; e < totalEpisodes; e++) {
                        const indicator = document.createElement("p");
                        indicator.classList.add("indicator");
                        indicator.textContent = e;

                        indicator.style.gridRow = 1;
                        indicator.style.gridColumn = e + 1;

                        episodesMatrix.appendChild(indicator);
                    }

                    for (let ss = 1; ss < totalSeasons; ss++) {
                         const indicator = document.createElement("p");
                        indicator.classList.add("indicator");
                        indicator.textContent = `T${ss}`;

                        indicator.style.gridRow = ss + 1;
                        indicator.style.gridColumn = 1;

                        episodesMatrix.appendChild(indicator);
                    }
                }

                seasonsData.forEach((season, sIndex) => {
                    season.Episodes.forEach((episode, eIndex) => {
                        const rating = episode.imdbRating;

                        const episodeCard = document.createElement("p");
                        episodeCard.classList.add("episode");
                        episodeCard.textContent = rating;

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

                        episodeCard.style.gridRow = sIndex + 2;
                        episodeCard.style.gridColumn = eIndex + 2;

                        episodesMatrix.appendChild(episodeCard);
                    })
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

fetch("https://www.omdbapi.com/?apikey=90019fb6&i=tt0903747")
    .then(response => response.json())
    .then(series => {
        showHeaderInformation(series);
        showEpisodesMatrix();
    })
    .catch(error => {
        console.log(error);
    })