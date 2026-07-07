let sidebarOpen = false;

const header = document.createElement("header");
header.innerHTML = `
  <h1>Top anime</h1>
  <p>The highest rated titles, according to MyAnimeList</p>
`;
document.body.appendChild(header);

const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

const sidebar = document.createElement("aside");
sidebar.id = "sidebar";
sidebar.classList.add("hidden");
document.body.appendChild(sidebar);

const footer = document.createElement("footer");
footer.id = "footer";
document.body.appendChild(footer);

fetch("https://api.jikan.moe/v4/top/anime")
  .then((response) => response.json())
  .then((data) => {
    const topAnime = data.data.filter((anime) => anime.score > 9); // only keep anime with score above 9

    topAnime.forEach((anime) => {
      const card = document.createElement("div");

      const image = document.createElement("img");
      image.src = anime.images.jpg.image_url;

      const title = document.createElement("h3");
      title.textContent = anime.title;

      card.appendChild(image);
      card.appendChild(title);

      card.addEventListener("click", (event) => {
        event.stopPropagation(); // prevent this same click from also triggering the document listener below

        if (sidebarOpen === true) {
          sidebar.classList.add("hidden");
          sidebarOpen = false;
          return;
        }

        sidebar.innerHTML = `
          <button id="close-btn">x</button>
          <h2>${anime.title}</h2>
          <p><strong>Rating:</strong> ${anime.rating}</p>
          <p><strong>Release date:</strong> ${anime.aired.string}</p>
          <p><strong>Score:</strong> ${anime.score}</p>
          <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
          <p><strong>Genres:</strong> ${anime.genres.map((genre) => genre.name).join(", ")}</p>
          <p><strong>Studios:</strong> ${anime.studios.map((studio) => studio.name).join(", ")}</p>
        `;

        sidebar.classList.remove("hidden");
        sidebarOpen = true;

        const closeBtn = document.getElementById("close-btn");
        closeBtn.addEventListener("click", () => {
          sidebar.classList.add("hidden");
          sidebarOpen = false;
        });
      });

      container.appendChild(card);
    });

    // close sidebar when clicking anywhere outside of it (cards already handle themselves above)
    document.addEventListener("click", (event) => {
      const clickedInsideSidebar = sidebar.contains(event.target);

      if (!clickedInsideSidebar && sidebarOpen === true) {
        sidebar.classList.add("hidden");
        sidebarOpen = false;
      }
    });
  });

const currentYear = new Date().getFullYear();
footer.textContent = `© ${currentYear} Laura Baptista`;
