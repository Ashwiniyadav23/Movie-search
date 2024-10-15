const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("input");
const resultsContainer = document.getElementById("result");

searchBtn.addEventListener('click', async () => {
    const query = input.value;
    if (!query) {
        alert("Please enter a movie title.");
        return;
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${query}`);
        const data = await response.json();

        if (response.ok && data.results.length > 0) {
            resultsContainer.innerHTML = '';
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const movieImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://i.pinimg.com/564x/d6/ca/26/d6ca2656985135da6de7764412ecb00a.jpg";
                movieDiv.innerHTML = `
                    <img src="${movieImage}" alt="${movie.title} Poster">
                    <h2>${movie.title || "Title not available"}</h2>
                    <h3>Year: ${movie.release_date ? movie.release_date.split('-')[0] : "Year not available"}</h3>
                `;      
                resultsContainer.appendChild(movieDiv);
            });
        } else {
            alert("Movie not found. Please try another title.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
