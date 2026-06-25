const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const formStatus = inquiryForm?.querySelector(".form-status");

const setMenu = (open) => {
  body.classList.toggle("nav-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
};

menuToggle?.addEventListener("click", () => {
  setMenu(!body.classList.contains("nav-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("scrolled", window.scrollY > 14);
  },
  { passive: true },
);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll(".faq-grid details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-grid details[open]").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = inquiryForm.querySelector('button[type="submit"]');
  const formData = new FormData(inquiryForm);
  const name = String(formData.get("name") || "").trim();

  if (submitButton) submitButton.disabled = true;
  if (formStatus) {
    formStatus.textContent = `Thanks${name ? `, ${name}` : ""}. Your request is ready to be connected to an email or CRM endpoint.`;
  }

  window.setTimeout(() => {
    inquiryForm.reset();
    if (submitButton) submitButton.disabled = false;
  }, 800);
});

const yearNode = document.querySelector("[data-year]");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
