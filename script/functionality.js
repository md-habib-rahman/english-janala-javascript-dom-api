function loadLessonButtons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonButton(data.data));
}

const displayLessonButton = (lessons) => {
  const dynamicLessonButtons = document.getElementById("lesson-buttons");
  for (lesson of lessons) {
    console.log(lesson);
  }
};

loadLessonButtons();
