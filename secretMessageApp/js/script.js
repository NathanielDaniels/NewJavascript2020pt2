document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  const input = document.querySelector("#message-input");
  console.log(input.value);
  const encrypted = btoa(input.value);

  const inputLink = document.querySelector("#link-input");
  inputLink.value = `${window.location}#${encrypted}`;
  inputLink.select();

  const card1 = document.querySelector(".card1");
  const card2 = document.querySelector(".card2");
  card1.classList.add("hidden");
  card2.classList.remove("hidden");
});

// const change1 = btoa("Nathan");
// console.log(change1);

// const changeBack = atob(change1);
// console.log(changeBack);
