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
    title.classList.add("text-2xl", "font-bold", "mx-4", "mt-4", "mb-2", list.color.class);

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
    detailBtn.classList.add("bg-slate-200", "w-1/3", "text-center", "py-2", "rounded-bl-md");
    detailBtn.onclick = function () { viewDetails(list.id) };
    detailBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';

    let editBtn = document.createElement("button");
    editBtn.classList.add("bg-slate-200", "w-1/3", "text-center", "py-2", "border-x-4", "border-slate-50");
    editBtn.onclick = function () { editList(list.id) };
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("bg-slate-200", "w-1/3", "text-center", "py-2", "rounded-br-md");
    deleteBtn.onclick = function () { deleteList(list.id) };
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

function viewDetails(id) {
  listsContainer.classList.add("hidden");
  detailView.classList.remove("hidden");
}

backBtn.addEventListener("click", () => {
  listsContainer.classList.remove("hidden");
  detailView.classList.add("hidden");
})

function editList(id) {

}

function deleteList(id) {

}
