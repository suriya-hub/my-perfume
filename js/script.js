document.addEventListener('DOMContentLoaded', () => {

  const images = [
    "./assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg",
    "./assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg",
    "./assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg",
    "./assets/aed0e9a718e6863cb177edc099de63dbd908eb05.jpg",
  ];
  let currentIndex = 0;
  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".dot");
  const thumbs = document.querySelectorAll(".thumb");
  const items = document.querySelectorAll(".accordion-item");

  const A = document.getElementById("A");
  const B = document.getElementById("B");
  const C = document.getElementById("C");
  const D = document.getElementById("D");

  const radioA = A.querySelector('input[type="radio"]');
  const radioB = B.querySelector('input[type="radio"]');
  const radioC = C.querySelector('input[type="radio"]');
  const radioD = D.querySelector('input[type="radio"]');

  const options = document.querySelectorAll(".fragrance-option");
  const selectedImage = document.getElementById("selectedImage");

  const container = document.getElementById("C");
  const cards = container.querySelectorAll(".fragrance-card");

  function updateImage(index) {
    currentIndex = index;
    mainImage.src = images[index];

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-black", i === index);
      dot.classList.toggle("border", i !== index);
    });
  }

  prevBtn.addEventListener("click", () => {
    updateImage((currentIndex - 1 + images.length) % images.length);
  });

  nextBtn.addEventListener("click", () => {
    updateImage((currentIndex + 1) % images.length);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      updateImage(Number(dot.dataset.index));
    });
  });

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      updateImage(Number(thumb.dataset.index));
    });
  });

  //-----------Subscription----------------
  // Initial state
  C.style.display = "none";
  D.style.display = "none";
  radioA.checked = true;
  radioB.checked = false
  radioC.checked = false
  radioD.checked = false

  // Click B → hide A & B, show C & D
  B.addEventListener("click", (e) => {
    e.preventDefault();
    A.style.display = "none";
    B.style.display = "none";
    radioA.checked = false;
    radioB.checked = false;

    C.style.display = "block";
    D.style.display = "block";
    radioC.checked = true;
    radioD.checked = false;
  });

  // Click D → hide C & D, show A & B
  D.addEventListener("click", (e) => {
    e.preventDefault();
    C.style.display = "none";
    D.style.display = "none";
    radioC.checked = false;
    radioD.checked = false;

    A.style.display = "block";
    B.style.display = "block";
    radioA.checked = true;
    radioB.checked = false;
  });
  //-------------Fragrance-------------
  options.forEach(option => {
    option.addEventListener("click", () => {
      const newImage = option.getAttribute("data-image");
      selectedImage.src = newImage;
    });
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      const newImage = option.dataset.image;
      selectedImage.src = newImage;
      const radio = option.querySelector(".variant-radio");
      if (radio) {
        radio.checked = true;
      }
    });
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const groupName = card.querySelector('input[type="radio"]').name;
      container
        .querySelectorAll(`input[name="${groupName}"]`)
        .forEach(r => r.closest(".fragrance-card")?.classList.remove("selected"));
      card.classList.add("selected");
    });
  });

  //----------Accordion--------------
  if (items.length) {
    const firstContent = items[0].querySelector(".content");
    const firstIcon = items[0].querySelector(".icon");
    firstContent.classList.remove("hidden");
    firstIcon.textContent = "−";
  }
  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => {
        const content = i.querySelector(".content");
        const icon = i.querySelector(".icon");

        if (i === item) {
          const isOpen = !content.classList.contains("hidden");
          content.classList.toggle("hidden", isOpen);
          icon.textContent = isOpen ? "+" : "−";
        } else {
          content.classList.add("hidden");
          icon.textContent = "+";
        }
      });
    });
  });

  //------------------------------------
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
