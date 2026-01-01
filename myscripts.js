// js/myscripts.js
// GitHub-safe, stable page transition + back-to-top

document.addEventListener("DOMContentLoaded", () => {
  const transition = document.getElementById("pageTransition");

  // On page load: wipe out quickly (feels like the page lands in)
  if (transition) {
    transition.classList.add("exit");
    window.setTimeout(() => {
      transition.classList.remove("exit");
      transition.classList.remove("active");
    }, 520);
  }

  // Intercept internal .html links (same tab) and play transition
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // prevent accidental new tab
    if (link.getAttribute("target") === "_blank") link.removeAttribute("target");

    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    const isAnchor = href.startsWith("#");
    const isInternalHtml = href.endsWith(".html") && !isExternal && !isAnchor;

    if (isInternalHtml) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (!transition) {
          window.location.href = href;
          return;
        }

        transition.classList.add("active");
        window.setTimeout(() => {
          window.location.href = href;
        }, 420);
      });
    }
  });

  // Back to top button
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
