(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  const loader = document.getElementById("loader");

  const START_FRAME = 2;
  const END_FRAME = 240;
  const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 239 frames

  const getFramePath = (index) => {
    const frameNum = String(START_FRAME + index).padStart(3, "0");
    return `./img/ezgif-frame-${frameNum}.png`;
  };

  const images = new Array(TOTAL_FRAMES);
  let lastDrawnImage = null;
  let targetProgress = 0;
  let currentProgress = 0;
  const LERP_FACTOR = 0.08; // Smooth inertia for frame scrubbing
  let lastRenderedIndex = -1;

  // Handle high-resolution displays & full containment
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      lastRenderedIndex = -1;
      render();
    }
  }

  // Draw image with full-screen cover scaling (fills full viewport, centered on subject)
  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Use cover scale to ensure full screen presentation
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
    lastDrawnImage = img;
  }

  // Get the best available image (exact or nearest loaded)
  function getBestAvailableImage(targetIndex) {
    if (images[targetIndex] && images[targetIndex].complete && images[targetIndex].naturalWidth > 0) {
      return images[targetIndex];
    }

    // Search closest available loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
        return images[prev];
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
        return images[next];
      }
    }

    return lastDrawnImage;
  }

  function render() {
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    const imgToDraw = getBestAvailableImage(frameIndex);
    if (imgToDraw) {
      drawFrame(imgToDraw);
      lastRenderedIndex = frameIndex;
    }
  }

  // Animation frame loop with smooth lerp
  function loop() {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.0001) {
      currentProgress += diff * LERP_FACTOR;
    } else {
      currentProgress = targetProgress;
    }

    const calculatedIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    if (calculatedIndex !== lastRenderedIndex) {
      render();
    }

    requestAnimationFrame(loop);
  }

  // Track scroll position for full page
  function onScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      targetProgress = Math.min(1, Math.max(0, scrollY / scrollHeight));
    }

    // Header scroll background toggle
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Active Navigation Link Highlighting
    updateActiveNav();
  }

  // Progressive image preloading
  function startPreloading() {
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      drawFrame(firstImg);
      if (loader) {
        loader.classList.add("hidden");
      }
      loadFramesInBatches();
    };

    firstImg.onerror = () => {
      if (loader) loader.classList.add("hidden");
      loadFramesInBatches();
    };
  }

  function loadFramesInBatches() {
    // Step 1: Preload evenly distributed keyframes first for fast scrubbing
    const step = 4;
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      if (!images[i]) {
        const img = new Image();
        img.src = getFramePath(i);
        images[i] = img;
      }
    }

    // Step 2: Load remaining frames in background
    setTimeout(() => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!images[i]) {
          const img = new Image();
          img.src = getFramePath(i);
          images[i] = img;
        }
      }
    }, 150);
  }

  // Active Navigation link updater (ScrollSpy)
  const sections = ["hero", "about", "skills", "projects", "process", "learning", "contact"];
  
  function updateActiveNav() {
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 1. If at the very bottom, activate the contact link
    if (scrollY + windowHeight >= documentHeight - 60) {
      setActiveLink("contact");
      return;
    }

    // 2. If near top, activate hero/home
    if (scrollY < 120) {
      setActiveLink("hero");
      return;
    }

    // 3. Find the section that occupies the primary focal zone (upper-middle viewport)
    let currentActive = "hero";
    const focalPoint = windowHeight * 0.35; // 35% down the viewport

    for (let i = 0; i < sections.length; i++) {
      const secId = sections[i];
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If element starts before or at the focal line and extends below it
        if (rect.top <= focalPoint && rect.bottom > focalPoint) {
          currentActive = secId;
          break;
        } else if (rect.top <= focalPoint) {
          currentActive = secId;
        }
      }
    }

    setActiveLink(currentActive);
  }

  function setActiveLink(activeId) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const targetHref = link.getAttribute("href");
      if (targetHref === `#${activeId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Interactive Form Handler
  const contactForm = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-msg");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) {
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `<span>Message Sent!</span>`;
        }
        if (formMsg) {
          formMsg.textContent = "Thank you! Your message has been received.";
          formMsg.className = "form-status-msg success";
        }
        contactForm.reset();
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = `<span>Send Message</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
          }
        }, 3000);
      }, 700);
    });
  }

  // Smooth Scroll on all Anchor links with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Set active immediately on click
        const cleanId = targetId.replace("#", "");
        setActiveLink(cleanId);
      }
    });
  });

  // Event Listeners
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("scroll", onScroll, { passive: true });

  // Initialize
  resizeCanvas();
  startPreloading();
  onScroll();
  requestAnimationFrame(loop);
})();
