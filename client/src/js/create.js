import { COLORS, populateColors, populateDropdown } from "./utils.js";

/* Select and populate elements needed to create list */
let listColor = document.querySelector("#createColor");
populateColors(listColor);

let listName = document.querySelector("#createName");
let createBtn = document.querySelector("#createListBtn");

/* Add event listener for create list function and make a POST request */
createBtn.addEventListener("click", () => {
  fetch("/api/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: listName.value,
      color: COLORS[Number(listColor.value)],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      listColor.value = "";
      listName.value = "";
      populateDropdown();
      alert("List created successfully.");
    });
});

/* Select and populate elements needed to create exercise */
populateDropdown();

let exerciseName = document.querySelector("#exerciseName");
let listAdd = document.querySelector("#listAdd");
let difficultyCreate = document.querySelector("#difficultyCreate");
let equipmentCreate = document.querySelector("#equipmentCreate");
let muscleCreate = document.querySelector("#muscleCreate");
let typeCreate = document.querySelector("#typeCreate");
let instructions = document.querySelector("#instructions");
let createExerciseBtn = document.querySelector("#createExerciseBtn");

/* Event listener for create exercise button that makes a POST request */
createExerciseBtn.addEventListener("click", () => {
  fetch("/api/exercises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      difficulty: difficultyCreate.value,
      equipment: equipmentCreate.value,
      instructions: instructions.value,
      muscle: muscleCreate.value,
      name: exerciseName.value,
      type: typeCreate.value,
      id: listAdd.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      difficultyCreate.value = "";
      equipmentCreate.value = "";
      instructions.value = "";
      muscleCreate.value = "";
      exerciseName.value = "";
      typeCreate.value = "";
      listAdd.value = "";
      alert("Exercise created successfully and added to list.");
    });
});
