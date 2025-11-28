// ========================
// BACKEND CONFIG
// ========================
// Change this to your deployed backend URL (Railway / Render):
// Example: const BACKEND_URL = "https://portfolio-backend-yourname.up.railway.app";
const BACKEND_URL = "https://portfolio-backend-1tv6a22so-mujahid137s-projects.vercel.app/";


// ========================
// THEME MANAGEMENT
// ========================
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  });
}

// ========================
// NAVIGATION
// ========================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ========================
// SCROLL PROGRESS BAR
// ========================
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// ========================
// PARTICLE + HOLOGRAM BACKGROUND
// ========================
const canvas = document.getElementById("particleCanvas");
let ctx = null;

if (canvas) {
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const particles = [];
const particleCount = 90;
let hologramOffset = 0;

// Center hologram aura (no mouse)
const hologramAura = document.createElement("div");
hologramAura.style.position = "fixed";
hologramAura.style.width = "50vw";
hologramAura.style.height = "50vw";
hologramAura.style.borderRadius = "50%";
hologramAura.style.left = "50%";
hologramAura.style.top = "50%";
hologramAura.style.transform = "translate(-50%, -50%)";
hologramAura.style.pointerEvents = "none";
hologramAura.style.zIndex = "1";
hologramAura.style.mixBlendMode = "screen";
hologramAura.style.opacity = "0.25";
hologramAura.style.background =
  "radial-gradient(circle at 50% 40%, rgba(0,255,255,0.8), rgba(0,0,0,0))";
document.body.appendChild(hologramAura);

let auraAngle = 0;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    if (!canvas) return;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.baseAlpha = Math.random() * 0.4 + 0.2;
    this.alpha = this.baseAlpha;
    this.phase = Math.random() * Math.PI * 2;
  }

  update() {
    if (!canvas) return;
    // Basic drift
    this.x += this.speedX;
    this.y += this.speedY;

    // Gentle wave movement
    this.y += Math.sin(this.phase + performance.now() / 1000) * 0.08;

    // Wrap around edges
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;

    // Flickering opacity
    this.alpha += (Math.random() - 0.5) * 0.02;
    this.alpha = Math.max(0.1, Math.min(0.9, this.alpha));
  }

  draw() {
    if (!ctx) return;
    const theme = html.getAttribute("data-theme") || "dark";
    const baseColor =
      theme === "dark"
        ? `rgba(0, 255, 255, ${this.alpha})`
        : `rgba(0, 180, 255, ${this.alpha * 0.8})`;

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 4
    );
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.7, "rgba(0, 255, 255, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  if (!canvas) return;
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function drawHologramLines() {
  if (!ctx || !canvas) return;
  const theme = html.getAttribute("data-theme") || "dark";
  const lineColor =
    theme === "dark" ? "rgba(0, 255, 255, 0.06)" : "rgba(0, 150, 255, 0.05)";

  const spacing = 45;
  hologramOffset += 0.7;
  if (hologramOffset > spacing) hologramOffset = 0;

  ctx.save();
  ctx.beginPath();
  for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
    ctx.moveTo(0, y + hologramOffset);
    ctx.lineTo(canvas.width, y + hologramOffset);
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function drawLinesBetweenParticles() {
  if (!ctx) return;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const alpha = 0.2 * (1 - distance / 150);
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const theme = html.getAttribute("data-theme") || "dark";
  if (theme === "dark") {
    ctx.fillStyle = "rgba(2, 6, 23, 0.6)";
  } else {
    ctx.fillStyle = "rgba(241, 245, 249, 0.5)";
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  drawLinesBetweenParticles();
  drawHologramLines();

  // Animate hologram aura
  auraAngle += 0.2;
  const scale = 1 + Math.sin(auraAngle * (Math.PI / 180)) * 0.05;
  hologramAura.style.transform = `translate(-50%, -50%) rotate(${auraAngle}deg) scale(${scale})`;
  hologramAura.style.opacity =
    0.18 + (Math.cos(auraAngle * (Math.PI / 180)) + 1) * 0.08;

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ========================
// HOLOGRAM GLITCH ON HERO TITLE
// ========================
const heroTitle = document.querySelector(".hero-title");

function triggerGlitch(element) {
  if (!element) return;
  element.style.transition = "none";

  const originalTransform = element.style.transform;
  const originalShadow = element.style.textShadow;
  const originalLetterSpacing = element.style.letterSpacing;

  const randomX = (Math.random() - 0.5) * 6;
  const randomY = (Math.random() - 0.5) * 6;

  element.style.transform = `translate(${randomX}px, ${randomY}px) skewX(2deg)`;
  element.style.letterSpacing = "0.08em";
  element.style.textShadow =
    "0 0 6px rgba(0,255,255,0.8), -2px 0 4px rgba(255,0,255,0.8)";

  setTimeout(() => {
    element.style.transform = originalTransform;
    element.style.textShadow = originalShadow;
    element.style.letterSpacing = originalLetterSpacing;
    element.style.transition = "all 0.15s ease-out";
  }, 120);
}

if (heroTitle) {
  setInterval(() => {
    if (Math.random() > 0.6) {
      triggerGlitch(heroTitle);
    }
  }, 3200);

  heroTitle.addEventListener("mouseenter", () => triggerGlitch(heroTitle));
}

// ========================
// PROJECTS DATA & FILTERING
// ========================
const projectsData = [
  {
    id: 1,
    title: "Neural Canvas",
    description:
      "AI-powered creative platform that transforms text prompts into stunning digital artwork.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    tags: ["React", "Python", "TensorFlow"],
    category: "React",
  },
  {
    id: 2,
    title: "Quantum Dashboard",
    description:
      "Real-time analytics dashboard with 3D data visualization and millisecond precision.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["TypeScript", "Three.js", "Node.js"],
    category: "TypeScript",
  },
  {
    id: 3,
    title: "Cyber Commerce",
    description:
      "Next-generation e-commerce platform with AR previews and cryptocurrency payments.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    category: "React",
  },
  {
    id: 4,
    title: "Synth Wave Radio",
    description:
      "Immersive music streaming platform with spatial audio and real-time visualizations.",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=500&fit=crop",
    tags: ["React Native", "Web Audio API"],
    category: "React",
  },
  {
    id: 5,
    title: "Code Forge",
    description:
      "Collaborative code editor with real-time pair programming and AI code completion.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    tags: ["React", "TypeScript", "WebSocket"],
    category: "TypeScript",
  },
  {
    id: 6,
    title: "Stellar Maps",
    description:
      "Interactive 3D space exploration app with real-time astronomical data.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=500&fit=crop",
    tags: ["Three.js", "WebGL", "Python"],
    category: "Python",
  },
];

function renderProjects(filter = "all") {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  const filtered =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  filtered.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image">
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

    projectsGrid.appendChild(card);

    setTimeout(() => {
      card.classList.add("show");
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 * index);

    // Hologram tilt effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = (x / rect.width - 0.5) * 10;
      const rotateX = (y / rect.height - 0.5) * -10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// ========================
// SKILLS ANIMATION
// ========================
const skillsData = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 82 },
  { name: "Three.js / WebGL", level: 78 },
  { name: "UI/UX Design", level: 85 },
];

function renderSkills() {
  const skillsList = document.getElementById("skillsList");
  if (!skillsList) return;

  skillsList.innerHTML = "";

  skillsData.forEach((skill, index) => {
    const skillDiv = document.createElement("div");
    skillDiv.className = "skill-item";
    skillDiv.style.animationDelay = `${0.1 * index}s`;
    skillDiv.style.opacity = "0";
    skillDiv.style.transform = "translateY(20px)";
    skillDiv.innerHTML = `
      <div class="skill-name">
        <span>${skill.name}</span>
        <span>${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" style="width: 0%"></div>
      </div>
    `;

    skillsList.appendChild(skillDiv);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = document.querySelectorAll(".skill-progress");
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = skillsData[index].level + "%";
          }, 100 * index);
        });

        const items = document.querySelectorAll(".skill-item");
        items.forEach((item) => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });

        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(skillsList);
}

// ========================
// HIGHLIGHTS
// ========================
const highlightsData = [
  { title: "Clean Code", description: "Writing maintainable, scalable code" },
  { title: "Creative Design", description: "Crafting beautiful interfaces" },
  { title: "Performance", description: "Optimizing for speed and efficiency" },
  { title: "Collaboration", description: "Working effectively with teams" },
];

function renderHighlights() {
  const highlightsGrid = document.getElementById("highlightsGrid");
  if (!highlightsGrid) return;

  highlightsGrid.innerHTML = "";

  highlightsData.forEach((highlight, index) => {
    const card = document.createElement("div");
    card.className = "highlight-card";
    card.style.animationDelay = `${0.1 * index}s`;
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.innerHTML = `
      <div class="highlight-icon">${["💻", "🎨", "⚡", "🤝"][index]}</div>
      <h4>${highlight.title}</h4>
      <p>${highlight.description}</p>
    `;

    highlightsGrid.appendChild(card);

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 150 * index);
  });
}

// ========================
// BLOG DATA & RENDERING
// ========================
const blogData = [
  {
    id: 1,
    title: "Building Futuristic UIs with Glass Morphism",
    excerpt:
      "Explore the techniques behind creating stunning glass morphism effects.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
    category: "Design",
    date: "Nov 25, 2024",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "The Power of Framer Motion in React",
    excerpt: "Learn how to create smooth animations using Framer Motion.",
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=500&fit=crop",
    category: "Development",
    date: "Nov 20, 2024",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Optimizing Web Performance in 2024",
    excerpt: "A comprehensive guide to making your websites lightning fast.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "Performance",
    date: "Nov 15, 2024",
    readTime: "10 min",
  },
];

function renderBlog() {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";

  blogData.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="blog-image">
      <div class="blog-content">
        <span class="blog-category">${post.category}</span>
        <h3 class="blog-title">${post.title}</h3>
        <div class="blog-meta">
          <span>📅 ${post.date}</span>
          <span>⏱️ ${post.readTime} read</span>
        </div>
        <p class="blog-excerpt">${post.excerpt}</p>
      </div>
    `;

    blogGrid.appendChild(card);

    setTimeout(() => {
      card.classList.add("show");
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 120 * index);
  });
}

// ========================
// CONTACT FORM
// ========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all the fields.");
      return;
    }

    const btn = contactForm.querySelector("button");
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
        alert("Server did not return valid JSON.");
        btn.textContent = "Server Error";
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
        }, 2500);
        return;
      }

      console.log("Backend response:", data);

      if (res.ok && data && data.success) {
        btn.textContent = "✓ Message Sent!";
        contactForm.reset();
      } else {
        console.error("Backend error:", data);
        btn.textContent = "Error, Try Again";
      }
    } catch (err) {
      console.error("Network error:", err);
      btn.textContent = "Network Error";
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    }, 2500);
  });
}

// ========================
// SMOOTH SCROLL
// ========================
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// ========================
// INTERSECTION OBSERVER FOR EXTRA FADE-IN
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function attachFadeObserver() {
  document
    .querySelectorAll(
      ".project-card, .blog-card, .highlight-card, .skill-item, .edu-card"
    )
    .forEach((el) => {
      fadeObserver.observe(el);
    });
}

// ========================
// INITIALIZE
// ========================
initTheme();
initParticles();
animateParticles();

renderProjects();
renderSkills();
renderHighlights();
renderBlog();
attachFadeObserver();
