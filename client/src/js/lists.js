import {
  toggleInstructions,
  toggleDropdown,
  populateDropdown,
} from "./utils.js";

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

let currentExercises = [];
let currentListViewId = NaN;

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
    div.classList.add(
      "bg-slate-50",
      "shadow-md",
      "rounded-md",
      "w-1/3",
      "flex",
      "flex-col",
      "justify-between"
    );

    let textSection = document.createElement("section");

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

    let exercises = document.createElement("ul");
    list.exercises.forEach((exercise) => {
      let li = document.createElement("li");
      li.textContent = exercise.name;
      exercises.appendChild(li);
    });
    exercises.classList.add("mx-4", "mb-4");

    textSection.appendChild(title);
    textSection.appendChild(exercises);

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
      currentListViewId = list.id;
      toggleEdit();
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
      currentListViewId = list.id;
      deleteList();
    };
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    buttonSection.appendChild(detailBtn);
    buttonSection.appendChild(editBtn);
    buttonSection.appendChild(deleteBtn);

    div.appendChild(textSection);
    div.appendChild(buttonSection);
    listsContainer.appendChild(div);
  });
}

let detailView = document.querySelector("#detailView");
let backBtn = document.querySelector("#backBtn");
let itemView = document.querySelector("#listItemView");

/* Get lists from back end and find specific list */
function viewDetails(id) {
  listsContainer.classList.add("hidden");
  detailView.classList.remove("hidden");
  currentListViewId = id;
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

/* Populate detail view with information from list */
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
  goBack();
});

/* Reset from detail view to viewing all lists */
function goBack() {
  listsContainer.classList.remove("hidden");
  detailView.classList.add("hidden");
}

/* Add selected exercise to another one of the user's lists */
function moveExercise(event) {
  toggleDropdown(event);
  let clicked = event.target;
  let id = Number(clicked.closest("section").id);
  fetch("/api/list/exercises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      exercise: currentExercises[id],
      id: clicked.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      populateLists(data);
      alert("Exercise added successfully.");
    });
}

/* Delete exercise from list */
function deleteExercise(event) {
  let clicked = event.target;
  let id = Number(clicked.closest("section").id);
  fetch("/api/list/exercises", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      listId: currentListViewId,
      exerciseId: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      goBack();
      populateLists(data);
      alert("Exercise successfully deleted.");
    });
}

let editForm = document.querySelector("#editForm");
let nameInput = document.querySelector("#nameInput");
let colorInput = document.querySelector("#colorInput");
let editBtn = document.querySelector("#editBtn");

function populateColors() {
  let initial = `<option value="">--Select Color--</option>`;
  colorInput.insertAdjacentHTML("beforeend", initial);

  colors.forEach((color) => {
    let option = `<option value="${color.id}">${color.name}</option>`;
    colorInput.insertAdjacentHTML("beforeend", option);
  });
}

editBtn.addEventListener("click", () => {
  toggleEdit();
  editList();
});

populateColors();

/* Edit name and color of list */
function toggleEdit() {
  editForm.classList.toggle("hidden");
}

function editList() {
  fetch("/api/list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: currentListViewId,
      name: nameInput.value,
      color: colors[Number(colorInput.value)],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      nameInput.value = "";
      colorInput.value = "";
      populateLists(data);
    });
}

/* TODO: Delete list */
function deleteList() {
  fetch("/api/list", {
    method: "DELETE",
    header: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: currentListViewId,
    }),
  })
    .then((res) => res.json())
    .then((data) => populateLists(data));
}
