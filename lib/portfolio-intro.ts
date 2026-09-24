// Runs before the first paint. If storage or JavaScript is unavailable, the site stays usable.
export const portfolioIntroBootstrap = `(() => {
  try {
    const key = "gld:intro:session";
    const seen = sessionStorage.getItem(key);
    sessionStorage.setItem(key, "1");
    if (seen || location.pathname !== "/" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.setAttribute("data-portfolio-intro", String(performance.now()));
    function release() {
      root.removeAttribute("data-portfolio-intro");
      const intro = document.getElementById("portfolio-intro");
      if (intro && intro.open) intro.close();
      removeEventListener("keydown", escape);
      removeEventListener("pagehide", release);
    }
    function escape(event) { if (event.key === "Escape") release(); }
    addEventListener("keydown", escape);
    addEventListener("pagehide", release);
    setTimeout(release, 3800);
  } catch { /* Fail open, including when sessionStorage is denied. */ }
})();`
