/* Toggle the instructions paragraph on each exercise */
export function toggleInstructions(event) {
  let clicked = event.target;
  let paragraph = clicked.closest("div").nextSibling;
  paragraph.classList.toggle("hidden");
}

/* Show the "add to list" dropdown when the user clicks the + button */
export function toggleDropdown(event) {
  let clicked = event.target;
  let dropdown = clicked.closest("section").lastElementChild;
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

/* Get all "add to list" dropdowns and populate them with options matching the user's current lists */
export function populateDropdown() {
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
      });
    });
}
