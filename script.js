// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// ===========================
// Smooth Scroll for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    }
  });
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);

// ===========================
// FAQ Section - Always Visible
// ===========================
// FAQ answers are always visible in this design
// No accordion functionality needed

// ===========================
// Service Tabs
// ===========================
const tabBtns = document.querySelectorAll(".tab-btn");
const serviceCards = document.querySelectorAll(".service-card");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab");

    // Update active tab button
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Show/hide service cards (for demo, we'll just add a subtle animation)
    serviceCards.forEach((card) => {
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.opacity = "1";
      }, 100);
    });
  });
});

// ===========================
// Carousel Functionality
// ===========================
class Carousel {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll(".project-card, .blog-card");
    this.indicators = container.parentElement.querySelectorAll(".indicator");
    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();

    this.init();
  }

  getItemsPerView() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  init() {
    if (this.indicators.length > 0) {
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          this.goToSlide(index);
        });
      });

      // Auto-play carousel
      this.autoPlay();
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateIndicators();

    // Add animation effect
    this.items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, i * 100);
    });
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });
  }

  autoPlay() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.indicators.length;
      this.goToSlide(this.currentIndex);
    }, 5000);
  }
}

// Initialize carousels
const projectsGrid = document.querySelector(".projects-grid");
const blogGrid = document.querySelector(".blog-grid");

if (projectsGrid) {
  new Carousel(projectsGrid);
}

if (blogGrid) {
  new Carousel(blogGrid);
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".project-card, .service-card, .testimonial-card, .blog-card, .faq-item",
);

animateElements.forEach((el) => {
  observer.observe(el);
});

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// ===========================
// Parallax Effect for Hero - DISABLED (User wants static image)
// ===========================
// const heroImage = document.querySelector(".hero-image");

// window.addEventListener("scroll", () => {
//   if (heroImage) {
//     const scrolled = window.pageYOffset;
//     const parallax = scrolled * 0.3;
//     heroImage.style.transform = `translateY(${parallax}px)`;
//   }
// });

// ===========================
// Counter Animation for Rating
// ===========================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toFixed(1);
      clearInterval(timer);
    } else {
      element.textContent = start.toFixed(1);
    }
  }, 16);
}

// Trigger counter animation when rating section is visible
const ratingText = document.querySelector(".rating-text");
if (ratingText) {
  const ratingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetValue = parseFloat(entry.target.textContent);
          if (!isNaN(targetValue)) {
            animateCounter(entry.target, targetValue);
          }
          ratingObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  ratingObserver.observe(ratingText);
}

// ===========================
// Form Validation (Newsletter)
// ===========================
const newsletterInput = document.querySelector(".newsletter input");

if (newsletterInput) {
  newsletterInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const email = newsletterInput.value;

      if (validateEmail(email)) {
        alert("Thank you for subscribing!");
        newsletterInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===========================
// Lazy Loading Images
// ===========================
const images = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

// ===========================
// Resize Handler
// ===========================
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize carousels on resize
    location.reload();
  }, 250);
});

// ===========================
// Page Load Animation
// ===========================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ===========================
// Console Welcome Message
// ===========================
console.log(
  "%c🔶 G-Walls Website",
  "color: #FF5C00; font-size: 24px; font-weight: bold;",
);
console.log(
  "%cEngineering Better Structures for the Future",
  "color: #B0B0B0; font-size: 14px;",
);
