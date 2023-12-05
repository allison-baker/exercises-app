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

createExerciseBtn.addEventListener("click", () => {
    fetch("/api/")
})
