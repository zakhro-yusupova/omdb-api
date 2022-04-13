const API_KEY = "e80be3d4";
const elFilmsSearch = document.querySelector(".films-search");
const elFilmsList = document.querySelector(".films-list");
const elPrevBtn = document.querySelector(".prev");
const elNextBtn = document.querySelector(".next");
const elTemplate = document.querySelector(".film-template").content;
const elPaginationList = document.querySelector(".pagination-list");

let search = "";
let activePage = 1;

function renderFilms(array, element) {
  element.innerHTML = null;

  const fragmentFilms = document.createDocumentFragment()

  array.forEach(item => {
    const clonedTemplate = elTemplate.cloneNode(true)

    clonedTemplate.querySelector(".film-img").src = item.Poster;
    clonedTemplate.querySelector(".film-title").textContent = item.Title.split(" ").slice(0 , 2).join(" ");
    clonedTemplate.querySelector(".film-year").textContent = item.Year;
    clonedTemplate.querySelector(".film-id").textContent = item.imdbID;

    fragmentFilms.appendChild(clonedTemplate);
  })

  element.appendChild(fragmentFilms);

}

async function getMovie() {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${activePage}`)

  const data = await res.json();

  if(activePage == 1){
    elPrevBtn.classList.add("disabled");

  }else {
    elPrevBtn.classList.remove("disabled");
  }

  if(data.Response && data.Search.length){
    renderFilms(data.Search, elFilmsList);
  }
}

elFilmsSearch.addEventListener("change", (evt) => {

  search = evt.target.value;
  getMovie();
})

elPrevBtn.addEventListener("click", function() {

  activePage--;
  getMovie();
})

elNextBtn.addEventListener("click", function() {

  activePage++;
  getMovie();
})
