// const movieData = fetch("http://www.omdbapi.com/?apikey=[55cde2c2]&");
// const moviePosters = fetch("http://img.omdbapi.com/?apikey=[55cde2c2]&");
// console.log(movieData);

//!Dropdown Menu
//? Select dropdown div
//? create input
//? handle input
//? do search
//? Add in html for menu
//? Add in option to menu

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown is-active">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>

`;
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "55cde2c2",
      s: searchTerm
    }
  });

  console.log(response.data.Error);
  if (response.data.Error) {
    document.body.append(response.data.Error);
    // input.value = "";
    return [];
  }

  return response.data.Search;
};

const onInput = async e => {
  const movies = await fetchData(e.target.value);

  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");

  for (let movie of movies) {
    // console.log(movie.Title);
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;
    option.classList.add("dropdown-divider");
    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", e => {
  console.log(e.target);
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});

//==================================================

//! Set Movie Title
// const title = response.data.Search[0].Title;
// const grabTitle = document.querySelector("#movieTitle");
// grabTitle.innerHTML = title;

// //! Set Poster Image
// const poster = response.data.Search[0].Poster;
// const img = document.querySelector("img");
// img.setAttribute("src", poster);
// console.log(img);

//==================================================
// Practice

// const fetchData2 = async () => {
//   const response = await axios.get("http://www.omdbapi.com/", {
//     params: {
//       apikey: "55cde2c2",
//       s: "Coraline"
//     }
//   });
//   const poster = response.data.Search[1].Poster;
//   const img = document.createElement("img");
//   img.setAttribute("src", poster);
//   console.log(img);
//   document.body.append(img);
// };

// fetchData2();
