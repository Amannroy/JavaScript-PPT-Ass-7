const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("search");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const username = usernameInput.value;
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        resultsDiv.innerHTML = `
          <h2>${data.name}</h2>
          <img src="${data.avatar_url}" alt="Avatar">
          <p>${data.bio}</p>
        `;
        resultsDiv.style.display = "block";
      } else {
        resultsDiv.innerHTML = "User not found";
        resultsDiv.style.display = "block";
      }
    });
});
