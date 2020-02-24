const createAutoComplete = ({ root, renderOption }) => {
  root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown is-active">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>

`;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  // const dropdownContent = root.querySelector(".dropdown-content");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async e => {
    const movies = await fetchData(e.target.value);

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      // dropdownContent.style = "display: none";
      return;
    }
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let movie of movies) {
      // console.log(movie.Title);
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(movie);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = movie.Title;
        onMovieSelect(movie);
      });
      option.classList.add("dropdown-divider");
      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
