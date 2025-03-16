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

const lessonbuttons = document.querySelectorAll(".lesson-buttons");
lessonbuttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    const icon = button.querySelector("i");
    icon.style.color = "white";
  });
  button.addEventListener("mouseout", () => {
    const icon = button.querySelector("i");
    icon.style.color = "#422ad5";
  });
});
