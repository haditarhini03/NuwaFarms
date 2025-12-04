document.addEventListener("DOMContentLoaded", () => {

let currentLang = localStorage.getItem("xLang") || "ar";

loadLanguage(currentLang);

// Load JSON file and insert translations
async function loadLanguage(lang) {
    const response = await fetch(`../assets/lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[key]) el.textContent = translations[key];
    });

    // Save preference
    localStorage.setItem("xLang", lang);

    // Update active class
    document.getElementById("lang-ar").classList.toggle("active", lang === "ar");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");

    // Change page direction
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
}

// Language switch
document.getElementById("lang-en").addEventListener("click", () => loadLanguage("en"));
document.getElementById("lang-ar").addEventListener("click", () => loadLanguage("ar"));
});