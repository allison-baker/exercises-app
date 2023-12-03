import { COLORS, populateColors, populateDropdown } from "./utils.js";

let listColor = document.querySelector("#createColor");
populateColors(listColor);

let listName = document.querySelector("#createName");
let createBtn = document.querySelector("#createListBtn");

createBtn.addEventListener("click", () => {
    fetch("/api/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            name: listName.value,
            listColor: COLORS[Number(listColor.value)],
        })
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
})