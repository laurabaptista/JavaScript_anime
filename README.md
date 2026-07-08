# Top Anime

A dynamic web page that fetches the highest-rated anime from the [Jikan API](https://jikan.moe/) (an unofficial MyAnimeList API) and displays them in a responsive grid. Clicking on any anime card opens a details panel with more information, and everything happens without a single page refresh.

## Live demo

[View the live site](https://laurabaptista.github.io/JavaScript_anime/)

## Features

- Fetches real-time data from the Jikan API (`/v4/top/anime`)
- Filters results to show only anime with a score above 9
- Dynamically builds the entire page structure with vanilla JavaScript (no HTML written by hand, aside from the script tag)
- Responsive CSS grid layout
- Click on any card to open a sidebar with details: rating, release date, score, synopsis, genres, and studios
- Sidebar toggle logic: clicking a card opens the sidebar, clicking again (or anywhere outside) closes it
- Auto-generated footer with the current year
- No page reloads at any point — all interactions are handled through the DOM

## Built with

- HTML5
- CSS3 (Grid layout)
- JavaScript (Vanilla JS — `fetch`, `filter`, `map`, DOM manipulation, event listeners)
- [Jikan API](https://docs.api.jikan.moe/)
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Karla](https://fonts.google.com/specimen/Karla) via Google Fonts

## How it works

1. On page load, the script fetches the top anime list from the Jikan API.
2. The results are filtered to keep only anime with a `score` above 9.
3. For each anime, a card (image + title) is created dynamically and appended to the page.
4. Clicking a card populates and reveals a sidebar with extended details about that anime.
5. Clicking the same card again, the close button, or anywhere outside the sidebar hides it.

## Running locally

Clone the repository and open `index.html` with a live server (e.g. the VS Code Live Server extension), since the fetch request needs to run over HTTP rather than the local file system.

```bash
git clone https://github.com/laurabaptista/JavaScript_anime.git
cd JavaScript_anime
```

Then open `index.html` with Live Server.

## Author

Laura Baptista
