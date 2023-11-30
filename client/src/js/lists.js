import { toggleInstructions, toggleDropdown, populateDropdown } from "./utils.js";

let currentExercises = [];

/* Select DOM elements */
let listsContainer = document.querySelector("#displayLists");
let listsMessage = document.querySelector("#listsMessage");

/* Get lists from back end */
fetch("/api/lists")
  .then((res) => res.json())
  .then((data) => populateLists(data));

/* Create div elements with list information */
function populateLists(lists) {
  listsContainer.innerHTML = "";

  // Check if there are lists to display and toggle the message appropriately
  if (lists.length === 0) listsMessage.classList.remove("hidden");
  else listsMessage.classList.add("hidden");

  lists.forEach((list) => {
    let div = document.createElement("div");
    div.classList.add("bg-slate-50", "shadow-md", "rounded-md", "w-1/3");

    let title = document.createElement("h2");
    title.textContent = list.name;
    title.classList.add(
      "text-2xl",
      "font-bold",
      "mx-4",
      "mt-4",
      "mb-2",
      list.color.class
    );

    div.appendChild(title);

    let exercises = document.createElement("ul");
    list.exercises.forEach((exercise) => {
      let li = document.createElement("li");
      li.textContent = exercise.name;
      exercises.appendChild(li);
    });
    exercises.classList.add("mx-4", "mb-4");

    let buttonSection = document.createElement("section");
    buttonSection.classList.add("flex", "flex-row", "w-full");

    let detailBtn = document.createElement("button");
    detailBtn.classList.add(
      "bg-slate-200",
      "w-1/3",
      "text-center",
      "py-2",
      "rounded-bl-md"
    );
    detailBtn.onclick = function () {
      viewDetails(list.id);
    };
    detailBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';

    let editBtn = document.createElement("button");
    editBtn.classList.add(
      "bg-slate-200",
      "w-1/3",
      "text-center",
      "py-2",
      "border-x-4",
      "border-slate-50"
    );
    editBtn.onclick = function () {
      editList(list.id);
    };
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add(
      "bg-slate-200",
      "w-1/3",
      "text-center",
      "py-2",
      "rounded-br-md"
    );
    deleteBtn.onclick = function () {
      deleteList(list.id);
    };
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    buttonSection.appendChild(detailBtn);
    buttonSection.appendChild(editBtn);
    buttonSection.appendChild(deleteBtn);

    div.appendChild(exercises);
    div.appendChild(buttonSection);
    listsContainer.appendChild(div);
  });
}

let detailView = document.querySelector("#detailView");
let backBtn = document.querySelector("#backBtn");
let itemView = document.querySelector("#listItemView");

/*  */
function viewDetails(id) {
  listsContainer.classList.add("hidden");
  detailView.classList.remove("hidden");
  fetch("/api/lists")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((list) => {
        if (list.id === id) {
          populateDetailView(list);
          populateDropdown();
        }
      });
    });
}

function populateDetailView(list) {
  itemView.innerHTML = "";

  let title = `<h2 class="text-2xl font-bold my-4 ${list.color.class}">${list.name}</h2>`;
  itemView.insertAdjacentHTML("beforeend", title);

  // To identify which exercise has been selected
  let idCount = 0;

  currentExercises = list.exercises;
  list.exercises.forEach((exercise) => {
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

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add(
      "btn",
      "bg-rose-600",
      "text-white",
      "w-10",
      "h-10",
      "flex",
      "justify-center",
      "items-center",
      "rounded-full"
    );
    deleteBtn.addEventListener("click", (event) => deleteExercise(event));
    deleteBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';

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
    selectList.addEventListener("change", (event) => moveExercise(event));

    buttonSection.appendChild(deleteBtn);
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

    itemView.appendChild(section);
    idCount++;
  });
}

backBtn.addEventListener("click", () => {
  listsContainer.classList.remove("hidden");
  detailView.classList.add("hidden");
});

/* FIXME: Add selected exercise to one of the user's lists */
function moveExercise(event) {
  toggleDropdown(event);
  let clicked = event.target;
  let id = Number(clicked.closest("section").id);
  console.log(currentExercises[id]);
}

// FIXME: Delete exercise from list
function deleteExercise(event) {
  let clicked = event.target;
  let id = Number(clicked.closest("section").id);
  console.log(currentExercises[id]);
}

// TODO: Edit name and color of list
function editList(id) {}

// TODO: Delete list
function deleteList(id) {}
