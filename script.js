// ==========================
// CONFIG: BACKEND URL
// ==========================
// Change this to your deployed backend URL (Railway/Render):
// Example: const BACKEND_URL = "https://portfolio-backend-yourname.up.railway.app";
const BACKEND_URL = "https://your-backend-url-here.com";

// ==========================
// HELPERS
// ==========================
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================
// PARTICLE BACKGROUND
// ==========================
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.floor((width * height) / 16000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // connect near particles
    ctx.strokeStyle = "rgba(0,255,255,0.12)";
    particles.forEach((p, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.globalAlpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

// ==========================
// PROJECTS, SKILLS, HIGHLIGHTS, BLOG DATA
// ==========================
const projects = [
  {
    title: "Futuristic Portfolio",
    description:
      "A high-performance, animated portfolio built with HTML, CSS and JavaScript, focused on futuristic UI and smooth user experience.",
    tags: ["Frontend", "UI/UX", "Animation"],
    image:
      "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: "React",
  },
  {
    title: "Virtual Zoo Management",
    description:
      "OOP-based Java project for managing animals, enclosures, and staff in a virtual zoo environment.",
    tags: ["Java", "OOP", "University"],
    image:
      "https://images.pexels.com/photos/88234/pexels-photo-88234.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: "Python",
  },
  {
    title: "Interactive Math Visualizer",
    description:
      "Tool for visualizing functions, derivatives and areas using interactive graphs for learning calculus.",
    tags: ["JavaScript", "Math", "Education"],
    image:
      "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tech: "TypeScript",
  },
];

const skills = [
  { name: "HTML / CSS / Tailwind", level: 85 },
  { name: "JavaScript (ES6+)", level: 80 },
  { name: "React / Next.js (learning)", level: 70 },
  { name: "Java / OOP", level: 75 },
  { name: "Problem Solving & DSA", level: 65 },
];

const highlights = [
  {
    icon: "⚡",
    title: "Performance-Focused",
    text: "I care about fast load times, clean structure and efficient code so your site feels snappy.",
  },
  {
    icon: "🎨",
    title: "Futuristic UI",
    text: "I love building bold, modern, neon-style interfaces that stand out and feel unique.",
  },
  {
    icon: "🧠",
    title: "Continuous Learner",
    text: "Always improving my skills in React, TypeScript, algorithms and backend concepts.",
  },
  {
    icon: "🤝",
    title: "Easy to Work With",
    text: "Clear communication, quick iteration and open to feedback at every step.",
  },
];

const blogPosts = [
  {
    title: "My Journey into Web Development",
    category: "Story",
    date: "Feb 2025",
    readTime: "5 min read",
    excerpt:
      "How I started with basic HTML, got curious about design, and slowly moved into JavaScript and real projects.",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Balancing University & Coding",
    category: "Productivity",
    date: "Mar 2025",
    readTime: "4 min read",
    excerpt:
      "Some strategies I use to manage CSE coursework while still building personal projects on the side.",
    image:
      "https://images.pexels.com/photos/374820/pexels-photo-374820.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Why I Love Futuristic Design",
    category: "Design",
    date: "Apr 2025",
    readTime: "3 min read",
    excerpt:
      "A short breakdown of why neon, glassmorphism and sci-fi inspired UI really motivate me to design.",
    image:
      "https://images.pexels.com/photos/7915358/pexels-photo-7915358.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

// ==========================
// POPULATE UI SECTIONS
// ==========================
function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  projects.forEach((project, index) => {
    if (filter !== "all" && project.tech !== filter) return;

    const card = document.createElement("div");
    card.className = "project-card show";
    card.style.animationDelay = index * 0.07 + "s";

    card.innerHTML = `
      <img src="${project.image}" alt="${
      project.title
    }" class="project-image" />
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function renderSkills() {
  const list = document.getElementById("skillsList");
  if (!list) return;
  list.innerHTML = "";

  skills.forEach((skill, index) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.style.animationDelay = index * 0.08 + "s";

    item.innerHTML = `
      <div class="skill-name">
        <span>${skill.name}</span>
        <span>${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}"></div>
      </div>
    `;
    list.appendChild(item);
  });
}

function renderHighlights() {
  const grid = document.getElementById("highlightsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  highlights.forEach((h, index) => {
    const card = document.createElement("div");
    card.className = "highlight-card";
    card.style.animationDelay = index * 0.09 + "s";

    card.innerHTML = `
      <div class="highlight-icon">${h.icon}</div>
      <h4>${h.title}</h4>
      <p>${h.text}</p>
    `;

    grid.appendChild(card);
  });
}

function renderBlog() {
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  grid.innerHTML = "";

  blogPosts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-card show";
    card.style.animationDelay = index * 0.07 + "s";

    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="blog-image" />
      <div class="blog-content">
        <span class="blog-category">${post.category}</span>
        <h3 class="blog-title">${post.title}</h3>
        <div class="blog-meta">
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <p class="blog-excerpt">${post.excerpt}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ==========================
// THEME TOGGLE
// ==========================
function initThemeToggle() {
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const saved = localStorage.getItem("mujahid-theme");
  if (saved === "light" || saved === "dark") {
    html.setAttribute("data-theme", saved);
  }

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("mujahid-theme", next);
  });
}

// ==========================
// NAV TOGGLE & SCROLL EFFECTS
// ==========================
function initNav() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navbar = document.querySelector(".navbar");
  const scrollBar = document.getElementById("scrollProgress");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (navbar) {
      if (scrolled > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }

    if (scrollBar) {
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      scrollBar.style.width = progress + "%";
    }
  });
}

// ==========================
// SKILL BAR ANIMATION
// ==========================
function initSkillObserver() {
  const skillSection = document.getElementById("about");
  if (!skillSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".skill-progress").forEach((bar) => {
            const level = bar.getAttribute("data-level");
            bar.style.width = level + "%";
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillSection);
}

// ==========================
// CONTACT FORM
// ==========================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameEl = document.getElementById("formName");
  const emailEl = document.getElementById("formEmail");
  const msgEl = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();

    if (!name || !email || !message) {
      alert("Please fill all the fields.");
      return;
    }

    form.querySelector("button[type='submit']").disabled = true;
    form.querySelector("button[type='submit']").textContent = "Sending...";

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: "", message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      alert("✅ Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message. Please try again later.");
    } finally {
      form.querySelector("button[type='submit']").disabled = false;
      form.querySelector("button[type='submit']").textContent = "Send Message";
    }
  });
}

// ==========================
// INIT EVERYTHING
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initThemeToggle();
  initNav();
  renderProjects();
  renderSkills();
  renderHighlights();
  renderBlog();
  initSkillObserver();
  initContactForm();

  // Project filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });
});
// ========================
// SECTION REVEAL + ACTIVE NAV
// ========================
function initSectionRevealAndNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // add base reveal class
  sections.forEach((sec) => sec.classList.add("section-reveal"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");

        if (entry.isIntersecting) {
          // reveal animation
          entry.target.classList.add("visible");

          // update active nav link
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -20% 0px",
    }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));
}
initTheme();
initParticles();
animateParticles();

renderProjects();
renderSkills();
renderHighlights();
renderBlog();
attachFadeObserver();
initSectionRevealAndNav(); // 👈 add this
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("siuu-overlay");
  const video = document.getElementById("siuu-video");
  const audio = document.getElementById("siuu-audio");
  const playBtn = document.getElementById("siuu-play-btn");
  const skipBtn = document.getElementById("siuu-skip-btn");

  overlay.classList.remove("hidden");

  // Start video muted so Chrome ALLOWS autoplay
  video.muted = true;

  video.play().catch(() => {
    console.warn("Video autoplay blocked");
  });

  // The magic fix: unmute and play sound on FIRST user action
  const enableSound = async () => {
    video.muted = false;
    audio.currentTime = 0;

    try {
      await audio.play();
    } catch (e) {
      console.warn("Still blocked:", e);
    }

    // Remove listener after sound plays once
    window.removeEventListener("click", enableSound);
    window.removeEventListener("scroll", enableSound);
    window.removeEventListener("keydown", enableSound);
  };

  // ANY user action will activate sound (best Chrome fix)
  window.addEventListener("click", enableSound, { once: true });
  window.addEventListener("scroll", enableSound, { once: true });
  window.addEventListener("keydown", enableSound, { once: true });

  // Skip button
  skipBtn.addEventListener("click", () => {
    audio.pause();
    video.pause();
    overlay.classList.add("hidden");
  });

  // Auto close when video ends
  video.addEventListener("ended", () => {
    overlay.classList.add("hidden");
  });
});
