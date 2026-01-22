document.addEventListener('DOMContentLoaded', () => {

  function animateCounter(el, end, duration = 1200, suffix = "") {
    if (!el) return;
    const startTime = performance.now();
    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${end}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  function triggerCounterOnView(id, end, duration = 1200, suffix = "") {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(el, end, duration, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  }

  // ----------------------------
  animateCounter(document.getElementById("power"), 10, 1200, "x");
  animateCounter(document.getElementById("ingredient"), 9);
  animateCounter(document.getElementById("customer"), 20, 1200, "K+");

  triggerCounterOnView("1", 84, 1200, "%");
  triggerCounterOnView("2", 78, 1200, "%");
  triggerCounterOnView("3", 89, 1200, "%");
  triggerCounterOnView("4", 90, 1200, "%");

});
