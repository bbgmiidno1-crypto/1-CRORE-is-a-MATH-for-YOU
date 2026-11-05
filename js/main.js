/* ==========================================================================
   1 CRORE is a SIMPLE MATH — Landing Page Interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  function setMenu(open) {
    if (!navToggle || !mainNav || !header) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menu band karein" : "Menu kholein");
    mainNav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      setMenu(navToggle.getAttribute("aria-expanded") !== "true");
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    document.addEventListener("click", function (e) {
      if (header && !header.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) setMenu(false);
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sectionIds = navLinks
    .map(function (link) { return link.getAttribute("href"); })
    .filter(function (href) { return href && href.charAt(0) === "#"; })
    .map(function (href) { return href.slice(1); });

  if ("IntersectionObserver" in window && sectionIds.length) {
    var activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) activeObserver.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    // Gentle stagger for siblings revealed together
    revealEls.forEach(function (el) {
      var siblings = el.parentElement
        ? Array.prototype.slice.call(el.parentElement.children).filter(function (c) {
            return c.classList && c.classList.contains("reveal");
          })
        : [el];
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty("--reveal-delay", Math.min(idx * 0.07, 0.42) + "s");
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Page preview carousel ---------- */
  var carousel = document.getElementById("page-carousel");
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var dotsWrap = document.getElementById("carousel-dots");
    var caption = document.getElementById("carousel-caption");
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");
    var current = 0;

    var captions = [
      'Table of Contents — saare 19 parts + Appendix A <span>· page 3</span>',
      'Part 4 — Manufacturer inquiry aur negotiation scripts <span>· page 16</span>',
      'Part 14 — Per-order profit ka calculation <span>· page 47</span>',
      'Part 15 — ₹1 crore ka mathematics <span>· page 50</span>',
      'Part 18 — 90-day action plan, week by week <span>· page 57</span>',
      'Appendix A — All-India cluster directory <span>· page 62</span>'
    ];

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Sample page " + (i + 1) + " / " + slides.length + " dikhayein");
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", function () { goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-selected", i === current ? "true" : "false");
      });
      if (caption && captions[current]) caption.innerHTML = captions[current];
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); });

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { goTo(current - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { goTo(current + 1); e.preventDefault(); }
    });

    // Touch swipe
    var touchX = null;
    var viewport = carousel.querySelector(".carousel-viewport");
    if (viewport) {
      viewport.addEventListener("touchstart", function (e) {
        touchX = e.changedTouches[0].clientX;
      }, { passive: true });
      viewport.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 42) goTo(current + (dx < 0 ? 1 : -1));
        touchX = null;
      }, { passive: true });
    }
  }

  /* ---------- FAQ accordion ---------- */
  var faqButtons = Array.prototype.slice.call(document.querySelectorAll(".faq-q"));
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      // Close others for a tidy reading experience
      faqButtons.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          var otherItem = other.closest(".faq-item");
          if (otherItem) otherItem.classList.remove("open");
        }
      });
      btn.setAttribute("aria-expanded", String(!isOpen));
      if (item) item.classList.toggle("open", !isOpen);
    });
  });

  /* ---------- Sticky mobile buy bar ---------- */
  var stickyBuy = document.getElementById("sticky-buy");
  var heroSection = document.querySelector(".hero");
  var buySection = document.getElementById("buy");
  var footer = document.querySelector(".site-footer");

  if (stickyBuy && heroSection && "IntersectionObserver" in window) {
    var heroVisible = true;
    var buyVisible = false;
    var footerVisible = false;

    function updateSticky() {
      var show = !heroVisible && !buyVisible && !footerVisible;
      stickyBuy.classList.toggle("visible", show);
      stickyBuy.setAttribute("aria-hidden", String(!show));
    }

    var stickyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === heroSection) heroVisible = entry.isIntersecting;
          if (entry.target === buySection) buyVisible = entry.isIntersecting;
          if (entry.target === footer) footerVisible = entry.isIntersecting;
        });
        updateSticky();
      },
      { threshold: 0.12 }
    );
    stickyObserver.observe(heroSection);
    if (buySection) stickyObserver.observe(buySection);
    if (footer) stickyObserver.observe(footer);
  }
})();
