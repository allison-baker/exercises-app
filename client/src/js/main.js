let searchSelection = document.querySelector("#searchSelection");

let nameSearch = document.querySelector("#nameSearch");
let typeSelection = document.querySelector("#typeSelection");
let muscleSelection = document.querySelector("#muscleSelection");
let difficultySelection = document.querySelector("#difficultySelection");

let searchBtn = document.querySelector("#searchBtn");
let searchInput = "";

searchSelection.addEventListener("change", (event) => {
  if (event.target.value === "name") {
    nameSearch.classList.remove("hidden");
    typeSelection.classList.add("hidden");
    muscleSelection.classList.add("hidden");
    difficultySelection.classList.add("hidden");
  }
  if (event.target.value === "type") {
    nameSearch.classList.add("hidden");
    typeSelection.classList.remove("hidden");
    muscleSelection.classList.add("hidden");
    difficultySelection.classList.add("hidden");
  }
  if (event.target.value === "muscle") {
    nameSearch.classList.add("hidden");
    typeSelection.classList.add("hidden");
    muscleSelection.classList.remove("hidden");
    difficultySelection.classList.add("hidden");
  }
  if (event.target.value === "difficulty") {
    nameSearch.classList.add("hidden");
    typeSelection.classList.add("hidden");
    muscleSelection.classList.add("hidden");
    difficultySelection.classList.remove("hidden");
  }
  if (event.target.value === "") {
    nameSearch.classList.add("hidden");
    typeSelection.classList.add("hidden");
    muscleSelection.classList.add("hidden");
    difficultySelection.classList.add("hidden");
  }
});

function hideAll() {
  nameSearch.classList.add("hidden");
  typeSelection.classList.add("hidden");
  muscleSelection.classList.add("hidden");
  difficultySelection.classList.add("hidden");

  searchInput = "";
  nameSearch.value = "";
  typeSelection.value = "";
  muscleSelection.value = "";
  difficultySelection.value = "";
  searchSelection.value = "";
}

let baseURL = "https://api.api-ninjas.com/v1/exercises?";
let api_key = "1JMQnEy0RPLJV4tBNDZCow==0istE6CwLcnJjg1s";
let currentExercises;

searchBtn.addEventListener("click", () => {
  let searchType = searchSelection.value;

  if (searchType === "name") searchInput = nameSearch.value;
  if (searchType === "type") searchInput = typeSelection.value;
  if (searchType === "muscle") searchInput = muscleSelection.value;
  if (searchType === "difficulty") searchInput = difficultySelection.value;

  let fullURL = baseURL + searchType + "=" + searchInput;
  fetch(fullURL, {
    method: "GET",
    headers: {
      "X-API-Key": api_key,
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      currentExercises = data;
      populateExercises(currentExercises);
      hideAll();
    });
});

let container = document.querySelector("#exercisesList");

function populateExercises(exercises) {
  container.innerHTML = "";
  let idCount = 0;

  exercises.forEach((exercise) => {
    let paragraphId = "paragraph" + idCount;

    let div = `<section class="p-4 rounded-md bg-slate-50 my-4 shadow-md"">
                <div class="flex flex-row justify-between items-center">
                  <h2 class="font-bold text-2xl text-slate-800 mb-4">${exercise.name}</h2>
                  <button class="btn bg-emerald-600 text-white px-3 py-2 rounded-full" onclick="showDropdown(event)"><i class="fa-solid fa-plus"></i></button>
                  <select class="listSelection hidden" onchange="addExercise(${idCount})"></select>
                </div>
                <h3 class="font-bold text-lg text-slate-600 mb-2">Difficulty: ${exercise.difficulty}, Type: ${exercise.type}, Muscle: ${exercise.muscle}</h3>
                <button class="btn bg-slate-900 text-white px-4 py-2 rounded-md" onclick="toggleInstructions(${paragraphId})">View Instructions</button>
                <p id="${paragraphId}" class="hidden mt-4 text-slate-900">${exercise.instructions}</p>
              </section>`;

    container.insertAdjacentHTML("beforeend", div);
    idCount++;
  });
}

function populateDropdown() {
  let addDropdowns = document.querySelectorAll(".listSelection");
  console.log(addDropdowns);
  fetch("/api/lists")
    .then((res) => res.json())
    .then((data) => {
      addDropdowns.forEach((dropdown) => {
        dropdown.innerHTML = "<option value=''>--Add to List--</option>";
        data.forEach((list) => {
          let option = `<option value="${list.id}">${list.name}</option>`;
          dropdown.insertAdjacentHTML("beforeend", option);
        });
      });
    });
}

populateDropdown();

function toggleInstructions(paragraphId) {
  paragraphId.classList.toggle("hidden");
}

function showDropdown(event) {
  let clicked = event.target;
  let dropdown = clicked.closest("div").lastElementChild;
  dropdown.classList.toggle("hidden");
}

function addExercise(idToAdd) {
  console.log(currentExercises[idToAdd]);
}
