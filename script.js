// Xử lý form liên hệ
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Cảm ơn bạn! Thông tin tư vấn đã được gửi thành công.");

    contactForm.reset();
  });
}

// Xử lý FAQ mở / đóng
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  item.addEventListener("click", function () {
    item.classList.toggle("active");
  });
});

// Xử lý cuộn mượt khi bấm menu
const menuLinks = document.querySelectorAll('a[href^="#"]');

menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (targetId === "#") {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

