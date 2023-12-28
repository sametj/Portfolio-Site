const profileCard = document.querySelector(".container-3D");
const aboutMe = document.querySelector(".about-me");
const aboutMeButton = document.querySelector(".experience-button");
const active = document.querySelector(".active");
const projects = document.querySelectorAll(".project");
const project = document.querySelector(".project");

const aboutMeText = ` Results-driven Software Engineering enthusiast with a strong
foundation in Java programming, Object-Oriented Programming (OOP),
and proficiency in Agile methodologies. Highly adaptable and
committed to contributing innovative solutions to complex software
development challenges. Seeking opportunities to further expand
expertise and make a meaningful impact in the world of software
engineering.`;
const experienceText = `CUNY School of Medicine                                                                                                                                       New York, NY                                                                                                                                                               
  Cuny Office Assistant                                                                                                                                             02/2023 - 07/2023
  Enhanced data organization and accuracy through Excel spreadsheet creation and editing
  Arranged Zoom meetings for seamless virtual interactions.
  Operated CUNYFirst website for requisition management
  
  New York City Department of Social Services 						                              New York, NY
  IT Intern 											           07/2022 - 08/2022
  Queried and edited Oracle database for required data and built Excel Trackers using ODBC for data visualization
  Used Jira and Confluence to link development issues for bug identification
  Participated in daily SCRUM meetings for task update.
  `;

// Add a mousemove event listener
profileCard.addEventListener("mousemove", function (e) {
  tilt(this, e);
});

aboutMe.addEventListener("mousemove", function (e) {
  tilt(this, e);
});
// Reset the tilt when the mouse leaves the element
profileCard.addEventListener("mouseleave", function () {
  resetTilt(this);
});

aboutMe.addEventListener("mouseleave", function () {
  resetTilt(this);
});

aboutMeButton.addEventListener("click", function () {
  if (aboutMe.childNodes[1].innerText === "About Me") {
    aboutMe.childNodes[1].innerText = "Experience";
    aboutMeButton.innerHTML = "About Me";
    aboutMe.childNodes[3].innerText = experienceText;
  } else if (aboutMe.childNodes[1].innerText === "Experience") {
    aboutMe.childNodes[1].innerText = "About Me";
    aboutMeButton.innerHTML = "Experience";
    aboutMe.childNodes[3].innerText = aboutMeText;
  }
});

// Tilt the element when mouse moves
function tilt(container, e) {
  const tiltX =
    (container.offsetWidth / 2 - (e.pageX - container.offsetLeft)) / 20;
  const tiltY =
    (container.offsetHeight / 2 - (e.pageY - container.offsetTop)) / 20;

  // Apply the tilt effect using the transform property
  container.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
}

// Reset the tilt effect when mouse moves out of the element
function resetTilt(container) {
  container.style.transform = "";
}

var currentIndex = 0;

function updateCarousel() {
  for (var i = 0; i < projects.length; i++) {
    if (i === currentIndex) {
      projects[i].classList.add("active");
    } else {
      projects[i].classList.remove("active");
    }
  }
}
let left = `translate3d(-60%, 0, -220px)`;
let right = `translate3d(60%, 0, -220px)`;
let middle = `translate3d(0, 0, 0)`;

projects.forEach(function (project, index) {
  project.addEventListener("click", function () {
    for (var i = 0; i < projects.length; i++) {
      if (projects[0].classList.contains("active")) {
        projects[1].style.transform = right;
        projects[0].style.transform = middle;
        projects[2].style.transform = left;
      } else if (projects[1].classList.contains("active")) {
        projects[2].style.transform = right;
        projects[1].style.transform = middle;
        projects[0].style.transform = left;
      } else if (projects[2].classList.contains("active")) {
        projects[0].style.transform = right;
        projects[1].style.transform = left;
        projects[2].style.transform = middle;
      }
    }
    currentIndex = index;

    updateCarousel();
  });
});
