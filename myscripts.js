// =======================================================
// PERSONA-STYLE UI INTERACTIONS & PAGE TRANSITIONS
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    const transition = document.getElementById("pageTransition");

    // ---------- TRANSITION TYPES ----------
    const transitions = [
        "transition-left",
        "transition-right",
        "transition-diag",
        "transition-collapse"
    ];

    // ---------- SOUND EFFECTS ----------
    const clickSound = new Audio("media/ui-click.mp3");
    const confirmSound = new Audio("media/ui-confirm.mp3");
    clickSound.volume = 0.4;
    confirmSound.volume = 0.4;

    // ---------- PAGE LOAD EXIT ----------
    if (transition) {
        transition.classList.add("exit");
        setTimeout(() => {
            transition.className = "";
            transition.style.opacity = "0";
        }, 500);
    }

    // ---------- INTERCEPT LINKS ----------
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        const isInternal =
            href &&
            href.endsWith(".html") &&
            !href.startsWith("http");

        if (isInternal) {
            link.removeAttribute("target");

            link.addEventListener("click", e => {
                e.preventDefault();

                clickSound.currentTime = 0;
                clickSound.play();

                const effect = transitions[Math.floor(Math.random() * transitions.length)];

                transition.className = effect;
                transition.style.opacity = "1";
                transition.classList.add("active");

                setTimeout(() => {
                    window.location.href = href;
                }, 420);
            });
        }
    });

    // ---------- BUTTON SHAKE ----------
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.add("shake");
            confirmSound.currentTime = 0;
            confirmSound.play();
            setTimeout(() => btn.classList.remove("shake"), 250);
        });
    });

    // ---------- TYPEWRITER TITLES ----------
    document.querySelectorAll(".typewriter").forEach(el => {
        const text = el.textContent;
        el.textContent = "";
        let i = 0;

        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 45);
    });

    // ---------- BACK TO TOP ----------
    const backBtn = document.getElementById("backToTopBtn");
    if (backBtn) {
        window.addEventListener("scroll", () => {
            backBtn.style.display = window.scrollY > 220 ? "block" : "none";
        });
        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
