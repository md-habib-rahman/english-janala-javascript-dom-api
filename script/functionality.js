function loadLessonButtons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonButton(data.data));
}

const displayLessonButton = (lessons) => {
  const dynamicLessonButtons = document.getElementById("lesson-buttons");
  for (lesson of lessons) {
    console.log(lesson);
    const lessonbtn = document.createElement("div");
    lessonbtn.innerHTML = `
	<button id="btn-${lesson.level_no}" onclick="displayLessons(${lesson.level_no})" class="btn btn-outline btn-primary 
	lesson-buttons"><i class="fa-solid fa-book-open"></i>
	Lesson-${lesson.level_no}</button>`;
    dynamicLessonButtons.appendChild(lessonbtn);
  }
};

loadLessonButtons();

const displayLessons = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      removeActiveClass();

      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("btn-active");
      loadSingleLesson(result.data);
      loader.classList.add("hidden");
    });
};

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("btn-active");
  for (btn of activeButtons) {
    btn.classList.remove("btn-active");
  }
}

//loading lesson cards
const loadSingleLesson = (cards) => {
  const lessonCards = document.getElementById("lesson-cards");
  lessonCards.innerHTML = "";
  if (!cards || cards.length === 0) {
    // console.log(cards);
    const noData = document.getElementById("no-data");
    noData.classList.remove("hidden");
    const noLesson = document.getElementById("no-lesson-selected");
    noLesson.classList.add("hidden");
  } else {
    for (element of cards) {
      const card = document.createElement("div");
      card.innerHTML = `
		<div class="text-center space-y-4">
										<h4 class="text-3xl font-bold">${element.word}</h4>
										<p class="text-xl">Meaning / Pronounciation</p>
										<h4 class="text-[#18181B] text-3xl">${
                      element.meaning ? element.meaning : "অর্থ নেই"
                    } / ${element.pronunciation}</h4>
									</div>
									<div class="flex justify-between">
									<button class="btn" onclick="showModal(${
                    element.id
                  })"><i class="fa-solid fa-circle-info" style="color: #374957;"></i></button>
										
									<button class="btn" onclick="pronounceWord('${
                    element.word
                  }')"><i class="fa-solid fa-volume-high" style="color: #374957;"></i></button>
										
									</div>`;
      card.classList.add(
        "card",
        "p-8",
        "bg-white",
        "rounded-lg",
        "flex",
        "flex-col",
        "gap-8",
        "hover:bg-slate-200",
        "transition"
      );
      //   console.log(element.id); onclick="showModal(${element.id})
      const noLesson = document.getElementById("no-lesson-selected");
      noLesson.classList.add("hidden");
      const noData = document.getElementById("no-data");
      noData.classList.add("hidden");
      lessonCards.appendChild(card);
    }
  }
};

const showModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result.data);
      const myModal = document.getElementById("my_modal_5");

      const modalTitle = document.getElementById("modal-title");
      modalTitle.innerText = `${result.data.word} (${result.data.pronunciation})`;

      const meaning = document.getElementById("meaning");
      const meaningTest = result.data.meaning ?? "অর্থ নেই";
      //console.log(meaning)
      meaning.innerText = meaningTest;

      const example = document.getElementById("example");

      example.innerText = result.data.sentence;

      const synonymsContainer = document.getElementById("synonyms");
      synonymsContainer.innerHTML = "";
      const synonyms = result.data.synonyms;

      if (synonyms.length > 0) {
        for (synonym of synonyms) {
          //   console.log(typeof synonyms);
          const synonymP = document.createElement("p");
          synonymP.innerHTML = `<p class="bg-[#EDF7FF] p-2 border-[#D7E4EF] border-1 rounded text-lg mr-2">${synonym}</p>`;
          synonymsContainer.appendChild(synonymP);
        }
      } else {
        const synonymP = document.createElement("p");
        synonymP.innerHTML = `<p class="bg-[#EDF7FF] p-2 border-[#D7E4EF] border-1 rounded text-lg mr-2">সমার্থক শব্দ পাওয়া যায়নি</p>`;
        synonymsContainer.appendChild(synonymP);
      }
      myModal.showModal();
    });
};

function pronounceWord(word) {
  console.log(word);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}

function checkLogin() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  if (name && password) {
    if (password === "123456") {
      document.getElementById("nav-bar").classList.remove("hidden");
      document.getElementById("faq").classList.remove("hidden");
      document.getElementById("voc-main").classList.remove("hidden");
      document.getElementById("name").value = "";
      document.getElementById("password").value = "";
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Password is not correct",
      });
      document.getElementById("name").value = "";
      document.getElementById("password").value = "";
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please Enter User & Password",
    });
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
  }
}

function logout() {
  document.getElementById("nav-bar").classList.add("hidden");
  document.getElementById("faq").classList.add("hidden");
  document.getElementById("voc-main").classList.add("hidden");
}
