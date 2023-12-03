/* Constant array of colors for the user to choose from */
export const COLORS = [
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

/* Fill the option elements of any dropdown using the colors array */
export function populateColors(colorInput) {
  let initial = `<option value="">--Select Color--</option>`;
  colorInput.insertAdjacentHTML("beforeend", initial);

  COLORS.forEach((color) => {
    let option = `<option value="${color.id}">${color.name}</option>`;
    colorInput.insertAdjacentHTML("beforeend", option);
  });
}
