// const movieData = fetch("http://www.omdbapi.com/?apikey=[55cde2c2]&");
// const moviePosters = fetch("http://img.omdbapi.com/?apikey=[55cde2c2]&");
// console.log(movieData);

const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "55cde2c2",
      s: searchTerm
    }
  });

  console.log(response.data.Error);
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const input = document.querySelector("input");

const onInput = async e => {
  const movies = await fetchData(e.target.value);
  for (let movie of movies) {
    console.log(movie.Title);
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${movie.Poster}" /
    <h1>${movie.Title}</h1>
    `;
    document.body.appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 500));

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
