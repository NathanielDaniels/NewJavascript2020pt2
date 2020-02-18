// const movieData = fetch("http://www.omdbapi.com/?apikey=[55cde2c2]&");
// const moviePosters = fetch("http://img.omdbapi.com/?apikey=[55cde2c2]&");
// console.log(movieData);

const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "55cde2c2",
      s: searchTerm
      // i: "tt0848228"
      // i: input
    }
  });

  return response.data.Search;
};

const input = document.querySelector("input");

const onInput = e => {
  fetchData(e.target.value);
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
