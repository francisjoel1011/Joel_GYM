/* ==========================================================================
   JOEL GYM — main.js
   Progressive enhancement: core nav (burger, sticky resolve, tel/anchor
   links) is vanilla JS and works even if a CDN script fails. Everything
   below the "ENHANCED MOTION" line requires GSAP/ScrollTrigger/SplitText/
   Lenis and quietly no-ops if any of them didn't load.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  var hasSplitText = hasGSAP && typeof window.SplitText !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";

  if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (hasSplitText) gsap.registerPlugin(SplitText);

  var navEl = document.querySelector("[data-nav]");

  /* ------------------------------------------------------------------
     CORE — works with zero animation libraries
     ------------------------------------------------------------------ */

  // Sticky nav resolve: transparent -> solid ink + red underline.
  (function navScrollState() {
    if (!navEl) return;
    var scrolled = false;
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var should = y > 60;
      if (should !== scrolled) {
        navEl.classList.toggle("is-scrolled", should);
        scrolled = should;
      }
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  // Mobile burger menu.
  var burger = document.querySelector("[data-burger]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  function closeMobileMenu() {
    if (!burger || !mobileMenu) return;
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileMenu.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });
  }

  // Lenis smooth scroll (skipped entirely under reduced motion — native
  // scroll takes over, which is the correct, designed fallback).
  var lenis = null;
  if (hasLenis && !reduceMotion) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", function () {
      if (hasScrollTrigger) ScrollTrigger.update();
    });
    if (hasGSAP) {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(time) { lenis.raf(time); requestAnimationFrame(raf); });
    }
  }

  // Anchor links: nav-aware smooth scroll via Lenis if present, else native.
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = navEl ? navEl.offsetHeight : 0;
      if (lenis) {
        lenis.scrollTo(target, { offset: -navH + 8 });
      } else {
        var y = target.getBoundingClientRect().top + window.scrollY - navH + 8;
        window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      }
      closeMobileMenu();
    });
  });

  // Preloader — capped hard under 600ms; CSS also has a 1.1s failsafe.
  (function preloader() {
    var el = document.querySelector("[data-preloader]");
    if (!el) return;
    if (reduceMotion || !hasGSAP) {
      el.style.display = "none";
      return;
    }
    var mark = el.querySelector(".preloader__mark");
    gsap.to(mark, { scale: 1.15, duration: 0.3, ease: "power2.out" });
    gsap.to(el, {
      opacity: 0, duration: 0.2, delay: 0.3, ease: "power1.out",
      onComplete: function () { el.style.display = "none"; }
    });
  })();

  /* ------------------------------------------------------------------
     ENHANCED MOTION — requires GSAP; each block no-ops independently
     if its own dependency (ScrollTrigger / SplitText) is missing.
     ------------------------------------------------------------------ */

  // Hero entrance stagger (load-triggered, not scroll-triggered).
  (function heroEntrance() {
    var hero = document.querySelector("[data-hero]");
    if (!hero || !hasGSAP) return;
    var items = hero.querySelectorAll("[data-hero-in]");
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 26 });
    gsap.to(items, {
      opacity: 1, y: 0,
      duration: reduceMotion ? 0.01 : 0.9,
      ease: "expo.out",
      stagger: reduceMotion ? 0 : 0.09,
      delay: 0.15
    });
  })();

  // Hero "beat of attention" scroll-lock — desktop only, motion allowed only.
  if (hasScrollTrigger && !reduceMotion) {
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        var hero = document.querySelector("[data-hero]");
        if (!hero) return function () {};
        var st = ScrollTrigger.create({
          trigger: hero, start: "top top", end: "+=55%", pin: true, pinSpacing: true
        });
        return function () { st.kill(); };
      }
    });
  }

  // Mural — the signature moment. Split, slam, glow, lock into Iron Grade.
  (function mural() {
    var muralEl = document.querySelector("[data-mural]");
    var headline = document.querySelector("[data-split-chars]");
    if (!muralEl || !headline) return;

    if (!hasGSAP || !hasScrollTrigger || !hasSplitText || reduceMotion) {
      // Designed static fallback: final state, no pin, no slam.
      muralEl.classList.add("is-landed");
      return;
    }

    var split = new SplitText(headline, { type: "chars" });

    function build(endPct) {
      gsap.set(split.chars, { opacity: 0, y: 60, scale: 0.6, force3D: true });
      muralEl.classList.remove("is-landed");

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: muralEl,
          start: "top top",
          end: "+=" + endPct + "%",
          pin: true,
          scrub: 0.6,
          onUpdate: function (self) {
            if (self.progress > 0.97) muralEl.classList.add("is-landed");
            else muralEl.classList.remove("is-landed");
          }
        }
      });

      split.chars.forEach(function (ch, i) {
        tl.to(ch, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, i * 0.06)
          .to(ch, { "--glow": 1, duration: 0.1 }, i * 0.06)
          .to(ch, { "--glow": 0, duration: 0.35 }, i * 0.06 + 0.1);
      });

      return tl;
    }

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        var tl = build(120);
        return function () { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); };
      },
      "(max-width: 1023.98px)": function () {
        // Same slam mechanic, re-paced shorter — mobile gets a snappier
        // pin, not the desktop cinematic length, since this audience wants
        // the phone number fast.
        var tl = build(55);
        return function () { tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill(); };
      }
    });
  })();

  // Facilities — "walk the floor" horizontal passage (desktop pin + scrub;
  // mobile/reduced-motion keeps the native scroll-snap carousel from CSS).
  (function facilities() {
    var section = document.querySelector("[data-facilities]");
    var track = document.querySelector("[data-facilities-track]");
    if (!section || !track || !hasGSAP || !hasScrollTrigger || reduceMotion) return;

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        section.classList.add("is-pinned-mode");
        gsap.set(track, { x: 0 });
        var scrollLength = Math.max(track.scrollWidth - window.innerWidth, 1);

        var tween = gsap.to(track, {
          x: -scrollLength,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=" + scrollLength,
            scrub: 0.4,
            pin: true,
            invalidateOnRefresh: true
          }
        });

        return function () {
          section.classList.remove("is-pinned-mode");
          tween.scrollTrigger && tween.scrollTrigger.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      }
    });
  })();

  // Gallery — "un-rack" reveal, scrubbed to scroll velocity. Slides + zooms
  // the <img> itself (xPercent + scale, both transform) inside the item's
  // existing static overflow:hidden — visually the same wipe as animating
  // clip-path directly, without clip-path's per-frame repaint cost.
  (function gallery() {
    if (!hasGSAP || !hasScrollTrigger || reduceMotion) return;
    document.querySelectorAll("[data-gallery-item]").forEach(function (item) {
      var img = item.querySelector("img");
      if (!img) return;
      gsap.fromTo(img, { xPercent: -100, scale: 1.15 }, {
        xPercent: 0, scale: 1, ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 92%", end: "top 55%", scrub: 0.5 }
      });
    });
  })();

  // Magnetic / weighted CTA buttons — fine pointers only, transform-only.
  (function magneticButtons() {
    if (!hasGSAP || reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = e.clientX - (rect.left + rect.width / 2);
        var relY = e.clientY - (rect.top + rect.height / 2);
        btn.classList.add("is-magnet-active");
        gsap.to(btn, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)",
          onComplete: function () { btn.classList.remove("is-magnet-active"); }
        });
      });
    });
  })();

  // Count-up stat — only for the one real, traceable figure on the site
  // (8 real zones listed in the ground truth). Never fabricates a number:
  // the static HTML value is already correct and this only adds motion.
  (function countUp() {
    if (!hasGSAP || !hasScrollTrigger || reduceMotion) return;
    document.querySelectorAll("[data-count-to]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      if (isNaN(target)) return;
      var proxy = { val: 0 };
      el.textContent = "0";
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(proxy, {
            val: target, duration: 1.3, ease: "power2.out",
            onUpdate: function () { el.textContent = String(Math.round(proxy.val)); }
          });
        }
      });
    });
  })();

  // Layout can shift slightly once real images finish decoding; one
  // refresh after full load keeps every pin/scrub measurement honest.
  if (hasScrollTrigger) {
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }
})();
