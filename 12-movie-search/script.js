const searchInput = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const grid = document.getElementById("results-grid");
const gridTitle = document.getElementById("grid-title");


const featuredMovies = ["Inception", "The Dark Knight", "Spider-Man: Across the Spider-Verse", "Oppenheimer", "Dune: Part Two", "The Godfather"];

window.onload = () => {
    loadHomepage();
};

async function loadHomepage() {
    gridTitle.textContent = "Featured Films";
    grid.innerHTML = "";
    for (const title of featuredMovies) {
        await fetchAndDisplayMovie(title, true);
    }
}

async function fetchAndDisplayMovie(query, append = false) {
    try {
        const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}`);
        const movie = await response.json();

        if (movie) {
            displayMovie(movie, append);
        }
    } catch (err) {
        console.error("Error loading movie:", err);
    }
}

function displayMovie(movie, append) {
    const poster = movie.image ? movie.image.medium : "https://via.placeholder.com/210x295/111/ca6702?text=No+Poster";

    const card = `
        <div class="movie-card">
            <div class="poster-box">
                <img src="${poster}" alt="${movie.name}">
            </div>
            <div class="movie-info">
                <h3>${movie.name}</h3>
            </div>
        </div>
    `;

    if (append) {
        grid.innerHTML += card;
    } else {
        grid.innerHTML = card + grid.innerHTML;
    }
}

// Search functionality
async function findMovies() {
    let query = searchInput.value.trim();
    if (query === "") return;

    gridTitle.textContent = `Search results for "${query}"`;
    grid.innerHTML = "<div class='message-box'><h3>Searching...</h3></div>";

    try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=" + query);
        const results = await response.json();

        grid.innerHTML = "";

        if (results.length === 0) {
            grid.innerHTML = "<div class='message-box'><h3>No results found.</h3><p>Try searching for another movie!</p></div>";
            return;
        }

        results.forEach(item => {
            displayMovie(item.show, true);
        });

    } catch (error) {
        console.error("Search error:", error);
        grid.innerHTML = "<div class='message-box'><h3>Something went wrong.</h3></div>";
    }
}


searchBtn.addEventListener("click", findMovies);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") findMovies();
});
