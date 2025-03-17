const navTags = document.querySelectorAll(".nav-anchor");
// console.log(navTag);

navTags.forEach((navTag) => {
  navTag.addEventListener("mouseover", () => {
    const icon = navTag.querySelector("i");
    icon.style.color = "white";
  });

  navTag.addEventListener("mouseout", () => {
    const icon = navTag.querySelector("i");
    icon.style.color = "#422ad5";
  });
});



// document.getElementById("lesson-buttons")
//   .addEventListener("mouseover", (event) => {
//     if (event.target.classList.contains("lesson-buttons")) {
//       const icon = event.target.querySelector("i");
//       if (icon) icon.style.color = "white";
//     }
//   });

// document.getElementById("lesson-buttons")
//   .addEventListener("mouseout", (event) => {
//     if (event.target.classList.contains("lesson-buttons")) {
//       const icon = event.target.querySelector("i");
//       if (icon) icon.style.color = "#422ad5";
//     }
//   });
