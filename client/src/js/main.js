import { toggleInstructions, toggleDropdown, populateDropdown } from "./utils.js";

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
let currentSearch = document.querySelector("#currentSearch");

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

  currentSearch.innerHTML = `Search type: ${searchType}</br>Search input: ${searchInput}`;
}

/* Add event listener to search button */
searchBtn.addEventListener("click", () => searchExercises());

/* Add event listener to name search (only text input) for enter key press */
nameSearch.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) searchExercises();
});

let container = document.querySelector("#exercisesList");
let waitingMessage = document.querySelector("#waitingMessage");
let currentSearchMessage = document.querySelector("#currentSearchMessage");

/* Add event listener to clear button that clears the DOM and brings back the waiting message */
clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
  waitingMessage.classList.remove("hidden");
  currentSearchMessage.classList.add("hidden");
});

/* Populate the DOM with results of the search */
function populateExercises(exercises) {
  container.innerHTML = "";

  // Can't toggle because if user searches multiple times in a row the message will come on and off
  if (!waitingMessage.classList.contains("hidden")) {
    waitingMessage.classList.add("hidden");
  }
  if (currentSearchMessage.classList.contains("hidden")) {
    currentSearchMessage.classList.remove("hidden");
  }

  // To identify which exercise has been selected
  let idCount = 0;

  exercises.forEach((exercise) => {
    // To identify and toggle the instructions paragraph when the view button is clicked
    let paragraphId = "paragraph" + idCount;

    let section = document.createElement("section");
    section.classList.add("rounded-md", "bg-slate-50", "my-4", "shadow-md");

    let div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-row",
      "justify-between",
      "items-center",
      "p-4"
    );

    let textSection = document.createElement("section");
    let buttonSection = document.createElement("section");
    buttonSection.id = idCount;

    let h3 = document.createElement("h3");
    h3.classList.add("text-xl", "text-slate-800", "mb-2");
    h3.textContent = exercise.name;

    let h4 = document.createElement("h4");
    h4.classList.add("font-bold", "text-slate-600", "mb-4");
    h4.textContent = `Difficulty: ${exercise.difficulty}, Type: ${exercise.type}, Muscle: ${exercise.muscle}`;

    let toggleBtn = document.createElement("button");
    toggleBtn.classList.add(
      "btn",
      "bg-slate-900",
      "text-white",
      "px-4",
      "py-2",
      "rounded-md"
    );
    toggleBtn.addEventListener("click", (event) => toggleInstructions(event));
    toggleBtn.textContent = "View Instructions";

    textSection.appendChild(h3);
    textSection.appendChild(h4);
    textSection.appendChild(toggleBtn);

    let addBtn = document.createElement("button");
    addBtn.classList.add(
      "btn",
      "bg-emerald-600",
      "text-white",
      "w-10",
      "h-10",
      "flex",
      "justify-center",
      "items-center",
      "rounded-full",
      "mt-2"
    );
    addBtn.addEventListener("click", (event) => toggleDropdown(event));
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';

    let selectList = document.createElement("select");
    selectList.classList.add("listSelection");
    selectList.style.display = "none";
    selectList.addEventListener("change", (event) => addExercise(event));

    buttonSection.appendChild(addBtn);
    buttonSection.appendChild(selectList);

    div.appendChild(textSection);
    div.appendChild(buttonSection);

    let instructions = document.createElement("p");
    instructions.classList.add(
      "hidden",
      "p-4",
      "bg-slate-300",
      "text-slate-900",
      "rounded-b-md"
    );
    instructions.id = paragraphId;
    instructions.textContent = exercise.instructions;

    section.appendChild(div);
    section.appendChild(instructions);

    container.appendChild(section);
    idCount++;
  });
}

/* FIXME: Add selected exercise to one of the user's lists */
function addExercise(event) {
  toggleDropdown(event);
  let clicked = event.target;
  let id = Number(clicked.closest("section").id);
  console.log(id);
}
