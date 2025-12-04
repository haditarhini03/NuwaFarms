document.addEventListener("DOMContentLoaded", () => {

    function initLangSwitch() {
        const enBtn = document.getElementById("lang-en");
        const arBtn = document.getElementById("lang-ar");

        if (!enBtn || !arBtn) {
            return setTimeout(initLangSwitch, 50); // retry until header loads
        }

        // Buttons exist → now attach listeners
        enBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loadLanguage("en");
        });

        arBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loadLanguage("ar");
        });

        // Set initial language
        const currentLang = localStorage.getItem("xLang") || "ar";
        loadLanguage(currentLang);
    }

    initLangSwitch();

    async function loadLanguage(lang) {
        response = await fetch(`/assets/lang/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (translations[key]) el.innerHTML  = translations[key];
        });

        localStorage.setItem("xLang", lang);

        document.getElementById("lang-ar").classList.toggle("active", lang === "ar");
        document.getElementById("lang-en").classList.toggle("active", lang === "en");

        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    }

});
