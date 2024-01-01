const profileCard = document.querySelector(".container-3D");
const aboutMe = document.querySelector(".about-me");
const projects = document.querySelectorAll(".project");
const projectContainer = document.querySelector(".projects-container");
const experience = document.querySelector(".experience");
const activeProject = document.querySelector(".active");

var currentIndex = 0;

// Add a mousemove event listener
profileCard.addEventListener("mousemove", function (e) {
  tilt(this, e);
});

aboutMe.addEventListener("mousemove", function (e) {
  tilt(this, e);
});

experience.addEventListener("mousemove", function (e) {
  tilt(this, e);
});

// Reset the tilt when the mouse leaves the element
profileCard.addEventListener("mouseleave", function () {
  resetTilt(this);
});

aboutMe.addEventListener("mouseleave", function () {
  resetTilt(this);
});

experience.addEventListener("mouseleave", function () {
  resetTilt(this);
});

// Tilt the element when mouse moves
tilt = (container, e) => {
  const tiltX =
    (container.offsetWidth / 2 - (e.pageX - container.offsetLeft)) / 20;
  const tiltY =
    (container.offsetHeight / 2 - (e.pageY - container.offsetTop)) / 20;

  // Apply the tilt effect using the transform property
  container.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
};

// Reset the tilt effect when mouse moves out of the element
resetTilt = (container) => {
  container.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

//Carousel

updateCarousel = () => {
  projects.forEach(function (project, index) {
    if (index === currentIndex) {
      project.classList.add("active");
    } else {
      project.classList.remove("active");
    }
  });
};

rotateCorousel = (array) => {
  let left = `translate3d(-60%, 0, -220px)`;
  let right = `translate3d(60%, 0, -220px)`;
  let middle = `translate3d(0, 0, 0)`;
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
};

projects.forEach(function (project, index) {
  project.addEventListener("click", function () {
    currentIndex = index;
    updateCarousel();
    rotateCorousel(projects);
  });
});

//Mobile Carousel and Hamburger Menu

mobileCorousel = (array) => {
  let touchStartX = 0;
  let touchEndX = 0;

  swipeStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  swipeMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  swipeEnd = () => {
    if (touchEndX === 0) {
      return;
    }
    if (touchEndX < touchStartX) {
      currentIndex++;
      if (currentIndex > array.length - 1) {
        currentIndex = 0;
      }
      updateCarousel();
      rotateCorousel(array);
    } else if (touchEndX > touchStartX) {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = array.length - 1;
      }
      updateCarousel();
      rotateCorousel(array);
    }

    // Reset
    touchStartX = 0;
    touchEndX = 0;
  };

  projectContainer.addEventListener("touchstart", swipeStart, false);
  projectContainer.addEventListener("touchmove", swipeMove, false);
  projectContainer.addEventListener("touchend", swipeEnd, false);
};

toggleMenu = () => {
  var hamburger = document.querySelector(".hamburger-menu");
  var menu = document.querySelector(".hamburger-navbar");
  menu.classList.toggle("active");
  if (menu.classList.contains("active")) {
    hamburger.innerHTML = `<i class="fa-solid fa-times fa-2xl"></i>`;
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
    hamburger.innerHTML = `<i class="fa-solid fa-bars fa-2xl"></i>`;
  }
};

mobileCorousel(projects);
