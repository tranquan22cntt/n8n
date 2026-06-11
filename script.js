const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx54jQLudP7Ek3HYsIphi09WUntVpKffztex6aarJuR4DIOe_X-PRy706cioMghM9R6/exec";

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove("active");
  if (hamburgerBtn) {
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
}

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("from_name").value,
      email: document.getElementById("from_email").value,
      phone: document.getElementById("from_phone").value,
      message: document.getElementById("message").value || "",
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        if (result.status === "success") {
          alert("Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ sớm nhất.");
          contactForm.reset();
        } else {
          alert("Gửi thất bại. Vui lòng thử lại.");
        }
      })
      .catch(function () {
        alert("Lỗi kết nối. Vui lòng thử lại sau.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Bắt đầu xây workflow";
      });
  });
}

document.querySelectorAll(".faq-item").forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("active");
  });
});

const revealSections = document.querySelectorAll(".brand-strip, main > .section");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealSections.forEach(function (section) {
    section.classList.add("scroll-page");
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach(function (section) {
    section.classList.add("is-visible");
  });
}

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");
    const targetSection = targetId === "#" ? null : document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
});

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("active");
    hamburgerBtn.classList.toggle("active", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
