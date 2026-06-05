// =============================================
// CẤU HÌNH - Thay URL sau khi deploy Google Apps Script
// =============================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx54jQLudP7Ek3HYsIphi09WUntVpKffztex6aarJuR4DIOe_X-PRy706cioMghM9R6/exec";

// =============================================
// FETCH NỘI DUNG TỪ GOOGLE SHEETS (CMS)
// =============================================
function loadContent() {
  if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL") return;

  fetch(GOOGLE_SCRIPT_URL)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.pricing) renderPricing(data.pricing);
      if (data.compare) renderCompare(data.compare);
      if (data.benefits) renderBenefits(data.benefits);
      if (data.faq) renderFAQ(data.faq);
    })
    .catch(function (err) {
      console.log("Dùng nội dung mặc định:", err);
    });
}

// Render bảng giá
function renderPricing(plans) {
  var grid = document.getElementById("pricingGrid");
  if (!grid || plans.length === 0) return;

  var html = "";
  plans.forEach(function (plan) {
    var isPopular = String(plan.popular).toLowerCase() === "có";
    var features = String(plan.features).split("|");

    html += '<div class="price-card' + (isPopular ? " popular" : "") + '">';
    if (isPopular) html += '<div class="popular-label">Phổ biến</div>';
    html += "<h3>" + plan.name + "</h3>";
    html += '<p class="price">' + plan.price + "</p>";
    html += '<p class="price-note">' + plan.note + "</p>";
    html += "<ul>";
    features.forEach(function (f) {
      if (f.trim()) html += "<li>" + f.trim() + "</li>";
    });
    html += "</ul>";
    html += '<a href="#contact" class="card-btn">' + plan.button + "</a>";
    html += "</div>";
  });

  grid.innerHTML = html;
}

// Render bảng so sánh
function renderCompare(rows) {
  var tbody = document.getElementById("compareBody");
  if (!tbody || rows.length === 0) return;

  var html = "";
  rows.forEach(function (row) {
    html += "<tr>";
    html += "<td>" + row.feature + "</td>";
    html += "<td>" + row.starter + "</td>";
    html += "<td>" + row.pro + "</td>";
    html += "<td>" + row.enterprise + "</td>";
    html += "</tr>";
  });

  tbody.innerHTML = html;
}

// Render lợi ích
function renderBenefits(items) {
  var grid = document.getElementById("benefitsGrid");
  if (!grid || items.length === 0) return;

  var html = "";
  items.forEach(function (item) {
    html += '<div class="benefit-card">';
    html += '<div class="icon">' + item.icon + '</div>';
    html += "<h3>" + item.title + "</h3>";
    html += "<p>" + item.desc + "</p>";
    html += "</div>";
  });

  grid.innerHTML = html;
}

// Render FAQ
function renderFAQ(items) {
  var list = document.getElementById("faqList");
  if (!list || items.length === 0) return;

  var html = "";
  items.forEach(function (item) {
    html += '<div class="faq-item">';
    html += "<h3>" + item.question + "</h3>";
    html += "<p>" + item.answer + "</p>";
    html += "</div>";
  });

  list.innerHTML = html;
  bindFaqEvents();
}

// Load nội dung khi trang mở
loadContent();

// =============================================
// XỬ LÝ FORM LIÊN HỆ
// =============================================
var contactForm = document.getElementById("contactForm");
var submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = {
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
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.status === "success") {
          alert("✅ Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ sớm nhất.");
          contactForm.reset();
        } else {
          alert("❌ Gửi thất bại. Vui lòng thử lại.");
        }
      })
      .catch(function () {
        alert("❌ Lỗi kết nối. Vui lòng thử lại sau.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Nhận tư vấn ngay";
      });
  });
}

// =============================================
// FAQ MỞ/ĐÓNG
// =============================================
function bindFaqEvents() {
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });
}
bindFaqEvents();

// =============================================
// CUỘN MƯỢT
// =============================================
var menuLinks = document.querySelectorAll('a[href^="#"]');
menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    var targetId = link.getAttribute("href");
    if (targetId === "#") return;
    var targetSection = document.querySelector(targetId);
    if (targetSection) {
      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile menu if open
      var mobileMenu = document.getElementById("mobileMenu");
      var hamburgerBtn = document.getElementById("hamburgerBtn");
      if (mobileMenu) mobileMenu.classList.remove("active");
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// =============================================
// HAMBURGER MENU (MOBILE)
// =============================================
var hamburgerBtn = document.getElementById("hamburgerBtn");
var mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
