/* Portfolio — Lakshmi Manojna */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  const preloaderFill = document.querySelector(".preloader-fill");
  const preloaderPercent = document.querySelector(".preloader-percent");
  let loadProgress = 0;

  function updatePreloader(p) {
    loadProgress = Math.min(100, p);
    if (preloaderFill) preloaderFill.style.width = loadProgress + "%";
    if (preloaderPercent) preloaderPercent.textContent = Math.round(loadProgress) + "%";
  }

  const loadInterval = setInterval(() => {
    if (loadProgress < 90) updatePreloader(loadProgress + Math.random() * 12);
  }, 120);

  window.addEventListener("load", () => {
    clearInterval(loadInterval);
    updatePreloader(100);
    setTimeout(() => {
      preloader?.classList.add("hidden");
      document.body.classList.add("loaded");
      initAnimations();
    }, 500);
  });

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === "undefined") return;
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  /* ---------- Particle canvas ---------- */
  function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const count = 60;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(78, 240, 216, 0.5)";
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
  }

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;

    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    function animateRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = "a, button, [data-magnetic], .project-card, .skill-chip";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (prefersReducedMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    const nav = document.querySelector(".nav");
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const scrollProgress = document.getElementById("scrollProgress");
    const sections = document.querySelectorAll("[data-section]");
    const navAnchors = document.querySelectorAll("[data-nav]");

    function onScroll() {
      const scrollY = window.scrollY;
      nav?.classList.toggle("scrolled", scrollY > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      if (scrollProgress) scrollProgress.style.width = pct + "%";

      let current = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        if (scrollY >= top) current = sec.id;
      });
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    navToggle?.addEventListener("click", () => {
      const open = navLinks?.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navAnchors.forEach((a) => {
      a.addEventListener("click", () => {
        navLinks?.classList.remove("open");
        navToggle?.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || 0) * 1000;
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  /* ---------- Counter animation ---------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const isFloat = target % 1 !== 0;
          const duration = 1500;
          const start = performance.now();

          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            el.textContent = isFloat ? val.toFixed(2) : Math.round(val);
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }

  /* ---------- Skill bars ---------- */
  function initSkillBars() {
    const fills = document.querySelectorAll(".skill-bar-fill");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fill = entry.target;
          const width = fill.dataset.width || 0;
          fill.style.width = width + "%";
          observer.unobserve(fill);
        });
      },
      { threshold: 0.3 }
    );
    fills.forEach((f) => observer.observe(f));
  }

  /* ---------- Timeline line ---------- */
  function initTimeline() {
    const line = document.querySelector(".timeline-line");
    if (!line) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.classList.add("animated");
            observer.unobserve(line);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(line);
  }

  /* ---------- Projects drag scroll ---------- */
  function initProjectsDrag() {
    const wrap = document.getElementById("projectsTrack");
    if (!wrap) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    wrap.addEventListener("mousedown", (e) => {
      isDown = true;
      wrap.style.cursor = "grabbing";
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
    });

    wrap.addEventListener("mouseleave", () => {
      isDown = false;
      wrap.style.cursor = "grab";
    });

    wrap.addEventListener("mouseup", () => {
      isDown = false;
      wrap.style.cursor = "grab";
    });

    wrap.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      wrap.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
      const track = wrap.querySelector(".projects-track");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }
  }

  /* ---------- GSAP hero animation ---------- */
  function initHeroGsap() {
    if (prefersReducedMotion || typeof gsap === "undefined") return;

    gsap.from(".hero-title .line", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.3,
    });

    gsap.from(".orbit-card", {
      scale: 0.8,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.5,
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = form.querySelector('[name="subject"]')?.value || "Portfolio Contact";
      const body = form.querySelector('[name="body"]')?.value || "";
      window.location.href = `mailto:lakshmimanognyasimhambhatla03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  function initAnimations() {
    initLenis();
    initReveal();
    initCounters();
    initSkillBars();
    initTimeline();
    initProjectsDrag();
    initHeroGsap();

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /* ---------- Boot ---------- */
  initParticles();
  initCursor();
  initMagnetic();
  initNav();
  initContactForm();

  if (document.readyState === "complete") {
    updatePreloader(100);
  }
})();
