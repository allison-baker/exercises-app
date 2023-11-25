// SEARCH PAGE

let colors = [
  {
    name: "Red",
    class: "text-red-800",
    id: 0,
  },
  {
    name: "Amber",
    class: "text-amber-600",
    id: 1,
  },
  {
    name: "Yellow",
    class: "text-yellow-400",
    id: 2,
  },
  {
    name: "Lime",
    class: "text-lime-500",
    id: 3,
  },
  {
    name: "Green",
    class: "text-green-900",
    id: 4,
  },
  {
    name: "Sky",
    class: "text-sky-400",
    id: 5,
  },
  {
    name: "Blue",
    class: "text-blue-800",
    id: 6,
  },
  {
    name: "Violet",
    class: "text-violet-400",
    id: 7,
  },
  {
    name: "Purple",
    class: "text-purple-900",
    id: 8,
  },
  {
    name: "Fuchsia",
    class: "text-fuchsia-400",
    id: 9,
  },
  {
    name: "Pink",
    class: "text-pink-500",
    id: 10,
  },
  {
    name: "Brown",
    class: "text-amber-950",
    id: 11,
  },
];

/* Select DOM elements */
let searchSelection = document.querySelector("#searchSelection");

let nameSearch = document.querySelector("#nameSearch");
let typeSelection = document.querySelector("#typeSelection");
let muscleSelection = document.querySelector("#muscleSelection");
let difficultySelection = document.querySelector("#difficultySelection");

let searchBtn = document.querySelector("#searchBtn");
let clearBtn = document.querySelector("#clearSearch");
let searchInput = "";

/* Add event listener to search parameter selection */
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

/* Function to reset the search selections after a search */
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

/* Make API call to Exercises API */
function searchExercises() {
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
      populateDropdown();
      hideAll();
    });
}

/* Add event listener to search button */
searchBtn.addEventListener("click", () => searchExercises());

/* Add event listener to name search (only text input) for enter key press */
nameSearch.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) searchExercises();
});

let container = document.querySelector("#exercisesList");
let waitingMessage = document.querySelector("#waitingMessage");

/* Add event listener to clear button that clears the DOM and brings back the waiting message */
clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
  waitingMessage.classList.remove("hidden");
})

/* Populate the DOM with results of the search */
function populateExercises(exercises) {
  container.innerHTML = "";

  // Can't toggle because if user searches multiple times in a row the message will come on and off
  if (!waitingMessage.classList.contains("hidden")) {
    waitingMessage.classList.add("hidden");
  }

  // To identify which exercise has been selected
  let idCount = 0;

  exercises.forEach((exercise) => {
    // To identify and toggle the instructions paragraph when the view button is clicked
    let paragraphId = "paragraph" + idCount;

    let div = `<section class="p-4 rounded-md bg-slate-50 my-4 shadow-md"">
                <div class="flex flex-row justify-between items-center">
                  <h2 class="font-bold text-2xl text-slate-800 mb-4">${exercise.name}</h2>
                  <section>
                    <button class="btn bg-emerald-600 text-white px-3 py-2 rounded-full" onclick="showDropdown(event)"><i class="fa-solid fa-plus"></i></button>
                    <select class="listSelection" style="display: none;" onchange="addExercise(event, ${idCount})"></select>
                  </section>
                </div>
                <h3 class="font-bold text-lg text-slate-600 mb-2">Difficulty: ${exercise.difficulty}, Type: ${exercise.type}, Muscle: ${exercise.muscle}</h3>
                <button class="btn bg-slate-900 text-white px-4 py-2 rounded-md" onclick="toggleInstructions(${paragraphId})">View Instructions</button>
                <p id="${paragraphId}" class="hidden mt-4 text-slate-900">${exercise.instructions}</p>
              </section>`;

    container.insertAdjacentHTML("beforeend", div);
    idCount++;
  });
}

/* Get all "add to list" dropdowns and populate them with options matching the user's current lists */
function populateDropdown() {
  let addDropdowns = document.getElementsByClassName("listSelection");
  fetch("/api/lists")
    .then((res) => res.json())
    .then((data) => {
      Array.from(addDropdowns).forEach((dropdown) => {
        dropdown.innerHTML = "<option value=''>--Add to List--</option>";
        data.forEach((list) => {
          let option = `<option value="${list.id}">${list.name}</option>`;
          dropdown.insertAdjacentHTML("beforeend", option);
        });
        let finalOption = "<option value='createNew'>CREATE NEW</option>";
        dropdown.insertAdjacentHTML("beforeend", finalOption);
      });
    });
}

/* Toggle the instructions paragraph on each exercise */
function toggleInstructions(paragraphId) {
  paragraphId.classList.toggle("hidden");
}

/* Show the "add to list" dropdown when the user clicks the + button */
function showDropdown(event) {
  let clicked = event.target;
  let dropdown = clicked.closest("section").lastElementChild;
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

/* TODO: Add selected exercise to one of the user's lists */
function addExercise(event, idToAdd) {
  showDropdown(event);
  console.log(currentExercises[idToAdd]);
}

// LISTS PAGE

/* Select DOM elements */
let listsDisplay = document.querySelector("#displayLists");
