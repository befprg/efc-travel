(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

const COMPANY_SHORT_NAME = "EFC";
const COMPANY_NAME = "EF Consultant LTD.";
const APP_NAME_EN = "EF Travel Tips";
const APP_NAME_TC = "EF旅遊小貼士";
const APP_NAME_SC = "EF旅游小贴士";
const CONTACT_EMAIL = "contact@efc.com";
const PRIVACY_EMAIL = "privacy@efc.com";

function initMainAfterLoad() {
  updateTitleByDefault();
  updateContactEmails();
  updatePrivacyContactEmails();
}

function initHeaderAfterLoad() {
  initColorModeToggler();
  initializeLanguageChange();
}

function initFooterAfterLoad() {
  updateCompanyShortNames();
  updateCopyrightYear();
}

function updateTitleByDefault() {
  const lang = getCurrentLanguageFromUrl();
  console.log(lang);
  if (lang == "en") {
    document.title = document.title.replace("EFC", APP_NAME_EN);
  } else if (lang == "tc") {
    document.title = document.title.replace("EFC", APP_NAME_TC);
  } else if (lang == "sc") {
    document.title = document.title.replace("EFC", APP_NAME_SC);
  }
}

function updateContactEmails() {
  const contactEmails = document.querySelectorAll(".contact-email");
  contactEmails.forEach((email) => {
    email.href = "mailto:" + CONTACT_EMAIL;
    email.innerHTML = CONTACT_EMAIL;
  });
}

function updatePrivacyContactEmails() {
  const privacyEmails = document.querySelectorAll(".privacy-email");
  privacyEmails.forEach((email) => {
    email.href = "mailto:" + PRIVACY_EMAIL;
    email.innerHTML = PRIVACY_EMAIL;
  });
}

function updateCompanyShortNames() {
  const companyShortNames = document.querySelectorAll(".company-short-name");
  companyShortNames.forEach((name) => {
    name.innerHTML = COMPANY_SHORT_NAME;
  });
}

function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightYear = document.querySelectorAll(".copyright-year");
  copyrightYear.forEach((data) => {
    data.innerHTML = currentYear;
  });
}

// color mode
function initColorModeToggler() {
  document.getElementById("colorModeButton").addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  });
}

// language
function initializeLanguageChange() {
  const currentUrl = window.location.href;

  if (document.getElementById("enLangButton")) {
    document.getElementById("enLangButton").href = getLanguageSpecificUrl(
      currentUrl,
      "en"
    );
  }
  if (document.getElementById("tcLangButton")) {
    document.getElementById("tcLangButton").href = getLanguageSpecificUrl(
      currentUrl,
      "tc"
    );
  }
  if (document.getElementById("scLangButton")) {
    document.getElementById("scLangButton").href = getLanguageSpecificUrl(
      currentUrl,
      "sc"
    );
  }
}

function getCurrentLanguageFromUrl() {
  var currentUrl = window.location.href;
  var language = currentUrl.match(/\/([a-z]{2})\//);

  if (language && language[1]) {
    return language[1];
  } else {
    return "en";
  }
}

function getLanguageSpecificUrl(currentUrl, language) {
  var baseUrl = currentUrl.replace(/\/[a-z]{2}\//, "/" + language + "/");
  return baseUrl;
}
// end of language
