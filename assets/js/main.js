document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu
  const burger = document.querySelector(".burger");
  const mobile = document.getElementById("mobileMenu");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      mobile.hidden = expanded;
    });
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  // reveal on scroll
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  // lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = lb?.querySelector(".lightbox__img");
  const lbBg = lb?.querySelector(".lightbox__bg");
  const lbClose = lb?.querySelector(".lightbox__close");

  function openLightbox(src) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.onerror = () => {
  alert("Фото не найдено. Проверь расширение файла (.jpg/.jpeg) и путь.");
};

    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lb || !lbImg) return;
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".shot[data-full]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full");
      if (src) openLightbox(src);
    });
  });

  lbBg?.addEventListener("click", closeLightbox);
  lbClose?.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
