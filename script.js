const profileCard = document.querySelector(".container-3D");
const aboutMe = document.querySelector(".about-me");
const aboutMeButton = document.querySelector(".experience-button");
const active = document.querySelector(".active");
const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".projects-container");

var currentIndex = 0;

let left = `translate3d(-60%, 0, -220px)`;
let right = `translate3d(60%, 0, -220px)`;
let middle = `translate3d(0, 0, 0)`;

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

function updateCarousel() {
  for (var i = 0; i < projects.length; i++) {
    if (i === currentIndex) {
      projects[i].classList.add("active");
    } else {
      projects[i].classList.remove("active");
    }
  }
}

function rotateCorousel(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[0].classList.contains("active")) {
      array[1].style.transform = right;
      array[0].style.transform = middle;
      array[2].style.transform = left;
    } else if (array[1].classList.contains("active")) {
      array[2].style.transform = right;
      array[1].style.transform = middle;
      array[0].style.transform = left;
    } else if (array[2].classList.contains("active")) {
      array[0].style.transform = right;
      array[1].style.transform = left;
      array[2].style.transform = middle;
    }
  }
}

projects.forEach(function (project, index) {
  project.addEventListener("click", function () {
    currentIndex = index;
    updateCarousel();
    rotateCorousel(projects);
  });
});

//Rototate carousel on mobile swipe
let touchStartX = 0;
let touchEndX = 0;

function swipeStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function swipeMove(e) {
  touchEndX = e.changedTouches[0].screenX;
}

function swipeEnd() {
  if (touchEndX === 0) {
    return;
  }
  if (touchEndX < touchStartX) {
    currentIndex++;
    if (currentIndex > projects.length - 1) {
      currentIndex = 0;
    }
    updateCarousel();
    rotateCorousel(projects);
  } else if (touchEndX > touchStartX) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = projects.length - 1;
    }
    updateCarousel();
    rotateCorousel(projects);
  }

  // Reset
  touchStartX = 0;
  touchEndX = 0;
}

projectContainer.addEventListener("touchstart", swipeStart, false);
projectContainer.addEventListener("touchmove", swipeMove, false);
projectContainer.addEventListener("touchend", swipeEnd, false);
