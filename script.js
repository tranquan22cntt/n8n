const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx54jQLudP7Ek3HYsIphi09WUntVpKffztex6aarJuR4DIOe_X-PRy706cioMghM9R6/exec";

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isPopular(value) {
  const text = String(value || "").trim().toLowerCase();
  return text === "co" || text === "có" || text === "yes" || text === "true";
}

function splitFeatures(value) {
  return String(value || "")
    .split("|")
    .map(function (item) {
      return item.trim();
    })
    .filter(Boolean);
}

function getExecutionText(planName, features) {
  const execution = features.find(function (item) {
    return /execution|executions/i.test(item);
  });

  if (execution) {
    const compact = execution
      .replace(/execution(s)?/gi, "")
      .replace(/\/tháng/gi, "")
      .replace(/mỗi tháng/gi, "")
      .trim();
    return {
      value: compact.replace("2.500", "2.5k").replace("15.000", "15k").replace("40.000", "40k"),
      label: "workflow executions<br>mỗi tháng",
    };
  }

  if (/enterprise/i.test(planName)) {
    return {
      value: "Tùy chỉnh",
      label: "số lượng workflow<br>executions",
    };
  }

  return {
    value: "Theo gói",
    label: "workflow executions<br>mỗi tháng",
  };
}

function getDeployText(planName) {
  if (/business/i.test(planName)) return "Self-hosted hoặc Cloud riêng";
  if (/enterprise/i.test(planName)) return "Cloud riêng hoặc Self-hosted";
  return "Hosted bởi đội ngũ triển khai";
}

function getIncludesText(planName) {
  if (/professional/i.test(planName)) return "Bao gồm Starter, cộng thêm:";
  if (/business/i.test(planName)) return "Bao gồm Professional, cộng thêm:";
  if (/enterprise/i.test(planName)) return "Bao gồm Business, cộng thêm:";
  return "Gói này bao gồm:";
}

function renderPricing(plans) {
  const pricingGrid = document.getElementById("pricingGrid");
  if (!pricingGrid || !Array.isArray(plans) || plans.length === 0) return;

  pricingGrid.innerHTML = plans
    .map(function (plan) {
      const name = escapeHtml(plan.name);
      const price = escapeHtml(plan.price);
      const note = escapeHtml(plan.note);
      const button = escapeHtml(plan.button || "Liên hệ");
      const features = splitFeatures(plan.features);
      const execution = getExecutionText(plan.name, features);
      const visibleFeatures = features.filter(function (item) {
        return !/execution|executions/i.test(item);
      });
      const popularClass = isPopular(plan.popular) ? " popular" : "";
      const popularLabel = isPopular(plan.popular) ? '<div class="popular-label">Phổ biến</div>' : "";
      const enterpriseClass = /enterprise/i.test(plan.name) ? " enterprise-price" : "";
      const executionClass = /enterprise/i.test(plan.name) ? " custom-execution" : "";

      return (
        '<div class="price-card' + popularClass + '">' +
        popularLabel +
        '<div class="plan-top">' +
        "<h3>" + name + "</h3>" +
        '<p class="plan-desc">' + note + "</p>" +
        "</div>" +
        '<p class="price' + enterpriseClass + '">' + price.replace("/tháng", "<span>/tháng</span>") + "</p>" +
        '<div class="execution-box' + executionClass + '">' +
        "<strong>" + escapeHtml(execution.value) + "</strong>" +
        "<span>" + execution.label + "</span>" +
        "</div>" +
        '<a href="#contact" class="card-btn">' + button + "</a>" +
        '<div class="deploy-row">' +
        '<span class="deploy-icon">☁</span>' +
        "<span>" + escapeHtml(getDeployText(plan.name)) + "</span>" +
        "</div>" +
        '<p class="plan-includes">' + escapeHtml(getIncludesText(plan.name)) + "</p>" +
        '<ul class="plan-feature-list">' +
        visibleFeatures.map(function (feature) {
          return "<li>" + escapeHtml(feature) + "</li>";
        }).join("") +
        "</ul>" +
        "</div>"
      );
    })
    .join("");
}

function loadPricingFromSheet() {
  fetch(GOOGLE_SCRIPT_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data && data.pricing) renderPricing(data.pricing);
    })
    .catch(function () {
      // Keep static pricing when the sheet is unavailable.
    });
}

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

loadPricingFromSheet();

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