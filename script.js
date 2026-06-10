const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx54jQLudP7Ek3HYsIphi09WUntVpKffztex6aarJuR4DIOe_X-PRy706cioMghM9R6/exec";

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMobileMenu(open) {
  if (!hamburgerBtn || !mobileMenu) return;

  mobileMenu.classList.toggle("active", open);
  hamburgerBtn.classList.toggle("active", open);
  hamburgerBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", function () {
    setMobileMenu(!mobileMenu.classList.contains("active"));
  });
}

document.addEventListener("click", function (event) {
  var faqItem = event.target.closest(".faq-item");
  if (faqItem && faqItem.parentElement && faqItem.parentElement.id === "faqList") {
    faqItem.classList.toggle("active");
    return;
  }

  var link = event.target.closest('a[href^="#"]');
  if (!link) return;

  var targetId = link.getAttribute("href");
  if (!targetId || targetId === "#") return;

  var targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  event.preventDefault();
  targetSection.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  setMobileMenu(false);
});

var revealSections = document.querySelectorAll(".brand-strip, main > .section");

revealSections.forEach(function (section) {
  section.classList.add("scroll-page");
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealSections.forEach(function (section) {
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach(function (section) {
    section.classList.add("is-visible");
  });
}

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var controller = new AbortController();
    var timeoutId = window.setTimeout(function () {
      controller.abort();
    }, 15000);

    var formData = new FormData(contactForm);
    var payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };
    var idleText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        if (result.status === "success") {
          alert("Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ sớm nhất.");
          contactForm.reset();
          return;
        }

        alert("Gửi thất bại. Vui lòng thử lại.");
      })
      .catch(function () {
        alert("Lỗi kết nối. Vui lòng thử lại sau.");
      })
      .finally(function () {
        window.clearTimeout(timeoutId);
        submitBtn.disabled = false;
        submitBtn.textContent = idleText;
      });
  });
}
