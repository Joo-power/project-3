// check if local storge is null
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  //toggle spin class
  this.classList.toggle("fa-spin");
  //toggle open class
  document.querySelector(".setting-box").classList.toggle("open");
};
//switch color
const colorLis = document.querySelectorAll(".color-list li");
colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set item in local storge
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
//background variable
let backOption = true;
let backinterval;

//check if there random background in local storge
let backlocalItem = localStorage.getItem("background_option");

//check if there random background in local storge is empty

if (backlocalItem !== null) {
  if (backlocalItem === "true") {
    backOption = true;
  } else {
    backOption = false;
  }
  document.querySelectorAll(".random-backround span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backlocalItem === "true") {
    document.querySelector(".random-backround .yes").classList.add("active");
  } else {
    document.querySelector(".random-backround .no").classList.add("active");
  }
}

//switch random background
const randbacEl = document.querySelectorAll(".random-backround span");
//loop on all spans
randbacEl.forEach((span) => {
  // clicl on every span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backOption = false;
      clearInterval(backinterval);
      localStorage.setItem("background_option", false);
    }
  });
});
//handle active
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
//select landing page
let landingPage = document.querySelector(".landing-page");
// Array of images

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs() {
  if (backOption === true) {
    backinterval = setInterval(() => {
      //get randome number
      let getRandom = Math.floor(Math.random() * imgsArray.length);
      //change imgs
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[getRandom] + '")';
    }, 1500);
  }
}

randomizeImgs();

let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
  //offset top

  let offsetTop = ourSkills.offsetTop;
  //skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window height
  let windowHeight = this.innerHeight;
  //window scroll top
  let yoffSet = this.pageYOffset;
  if (yoffSet > offsetTop + skillsOuterHeight - windowHeight) {
    let allskills = document.querySelectorAll(
      ".skills-box .skill-progress span"
    );
    allskills.forEach((skills) => {
      skills.style.width = skills.dataset.progress;
    });
  }
};

//create pop up for gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    //creat popup box
    let popupbox = document.createElement("div");
    popupbox.className = "popup-box";
    if (img.alt !== null) {
      let headImg = document.createElement("h3");
      let imgtext = document.createTextNode(img.alt);
      headImg.appendChild(imgtext);
      popupbox.appendChild(headImg);
    }
    let popupimg = document.createElement("img");
    popupimg.src = img.src;
    popupbox.appendChild(popupimg);
    document.body.appendChild(popupbox);

    //create close span
    let closebtn = document.createElement("span");
    let closebtnText = document.createTextNode("X");
    closebtn.appendChild(closebtnText);
    popupbox.appendChild(closebtn);
    closebtn.className = "close-btn";
  });
});

//remove popup image

document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrolltosection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrolltosection(allBullets);
scrolltosection(allLinks);

let bulletsSpan = document.querySelectorAll(".show-Bullets span");
let bulletscontainer = document.querySelector(".nav-bullets");
// check if local storge is null
let BulletsLocal = localStorage.getItem("Bullets-option");

if (BulletsLocal !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (BulletsLocal === "block") {
    bulletscontainer.style.display = "block";
    document.querySelector(".show-Bullets .yes").classList.add("active");
  } else {
    bulletscontainer.style.display = "none";
    document.querySelector(".show-Bullets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (span.dataset.display === "show") {
      bulletscontainer.style.display = "block";
      localStorage.setItem("Bullets-option", "block");
    } else {
      bulletscontainer.style.display = "none";
      localStorage.setItem("Bullets-option", "none");
    }
  });
});

//reset button
document.querySelector(".rest-option").onclick = () => {
  localStorage.removeItem("Bullets-option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");

  window.location.reload();
};

//toggle menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});
links.onclick = function (e) {
  e.stopPropagation();
};
