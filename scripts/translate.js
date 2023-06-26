const allLanguages = ["en", "ar"];

const currentPathName = window.location.pathname;
let currentLanguage = localStorage.getItem("language") || checkBrowserLang() || "en";
let currentTexts = {};

const languageButton = document.querySelector(".language-btn");
const body = document.querySelector("body");

languageButton.addEventListener("click", (event) => {
  if (languageButton.textContent === "AR") {
    languageButton.textContent = "EN";
    languageButton.dataset.btn = "en";
  } else {
    languageButton.textContent = "AR";
    languageButton.dataset.btn = "ar";
  }

  changeLang();
});

function checkPagePathName() {
  switch (currentPathName) {
    case "/index.html":
      currentTexts = homeTexts;
      break;
    default:
      currentTexts = homeTexts;
      break;
  }
}

checkPagePathName();

function changeLang() {
  for (const key in currentTexts) {
    let elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentTexts[key][currentLanguage];
    }
  }

  if (currentLanguage === "ar") {
    languageButton.textContent = "EN";
    languageButton.dataset.btn = "en";
  } else {
    languageButton.textContent = "AR";
    languageButton.dataset.btn = "ar";
  }

  body.dataset.lang = currentLanguage;
}

changeLang();

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLanguages.includes(navLang);
  if (result) {
    return navLang;
  }
}

languageButton.addEventListener("click", (event) => {
  currentLanguage = event.target.dataset.btn;
  localStorage.setItem("language", event.target.dataset.btn);
  changeLang();
});
