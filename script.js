// create the base elements dynamically
const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

const sidebar = document.createElement("aside");
sidebar.id = "sidebar";
sidebar.classList.add("escondido");
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

      image.addEventListener("click", () => {
        if (!sidebar.classList.contains("escondido")) {
          return;
        }

        sidebar.innerHTML = `
          <button id="close-btn">x</button>
          <h2>${anime.title}</h2>
          <p>Rating: ${anime.rating}</p>
          <p>Release date: ${anime.aired.string}</p>
          <p>Score: ${anime.score}</p>
          <p>Synopsis: ${anime.synopsis}</p>
          <p>Genres: ${anime.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Studios: ${anime.studios.map((studio) => studio.name).join(", ")}</p>
        `;

        sidebar.classList.remove("escondido");

        const closeBtn = document.getElementById("close-btn");
        closeBtn.addEventListener("click", () => {
          sidebar.classList.add("escondido");
        });
      });

      const title = document.createElement("h3");
      title.textContent = anime.title;

      card.appendChild(image);
      card.appendChild(title);

      container.appendChild(card);
    });

    // close sidebar when clicking outside of it or outside an image
    document.addEventListener("click", (event) => {
      const clickedInsideSidebar = sidebar.contains(event.target);
      const clickedOnImage = event.target.tagName === "IMG";

      if (!clickedInsideSidebar && !clickedOnImage) {
        sidebar.classList.add("escondido");
      }
    });
  });

const currentYear = new Date().getFullYear();
footer.textContent = `© ${currentYear} Laura Baptista`;
