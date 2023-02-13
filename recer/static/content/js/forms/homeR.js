// add hovered class to selected list item
let list = document.querySelectorAll(".navigation2 li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation2 = document.querySelector(".navigation2");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation2.classList.toggle("active");
  main.classList.toggle("active");
};
