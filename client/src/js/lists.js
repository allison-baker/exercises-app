/* Select DOM elements */
let listsContainer = document.querySelector("#displayLists");
let listsMessage = document.querySelector("#listsMessage");

/* Get lists from back end */
fetch("/api/lists")
  .then((res) => res.json())
  .then((data) => populateLists(data))

/* Create div elements with list information */
function populateLists(lists) {
  listsContainer.innerHTML = "";

  // Check if there are lists to display and toggle the message appropriately
  if (lists.length === 0) listsMessage.classList.remove("hidden");
  else listsMessage.classList.add("hidden");

  lists.forEach((list) => {
    let div = document.createElement("div");
    div.classList.add("p-4", "bg-slate-50", "shadow-md", "rounded-md", "w-1/3");

    let title = document.createElement("h2");
    title.textContent = list.name;
    title.classList.add("text-2xl", "font-bold", "mb-2", list.color.class);

    div.appendChild(title);

    let exercises = document.createElement("ul");
    list.exercises.forEach((exercise) => {
      let li = document.createElement("li");
      li.textContent = exercise.name;
      exercises.appendChild(li);
    })

    div.appendChild(exercises);
    listsContainer.appendChild(div);
  })
}