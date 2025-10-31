/* ==========
   Simple SPA Router (Hash-based)
   - Routes: /about, /projects, /contact
   - Updates active nav link
   - Renders content into #app
=========== */

const routes = {
    "/": renderAbout,
    "/about": renderAbout,
    "/projects": renderProjects,
    "/contact": renderContact,
  };
  
  const projects = [
    {
      title: "Machine Learning Model",
      desc: "Built predictive models to identify trends and patterns in complex datasets.",
      img: "https://www.techspot.com/articles-info/2048/images/2020-07-04-image.jpg",
    },
    {
      title: "Data Visualization Dashboard",
      desc: "Interactive dashboards using Python, Tableau, and Power BI for executive insights.",
      img: "https://dashthis.com/media/4150/data-visualization-dashboard.png",
    },
    {
      title: "AI Business Analytics",
      desc: "AI-driven decision models to optimize operations and increase ROI.",
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    },
  ];
  
  function $(sel, root = document) { return root.querySelector(sel); }
  function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
  
  function setActiveLink(path){
    $all(".nav-link").forEach(a => {
      const href = a.getAttribute("href") || "";
      const match = href.replace("#", "") === `#${path}`;
      a.classList.toggle("active", match);
    });
  }
  
  function navigate() {
    const hash = window.location.hash || "#/about";
    const path = hash.replace("#", "");
    const view = routes[path] || renderNotFound;
    view();
    setActiveLink(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  function mount(html){
    const app = $("#app");
    app.innerHTML = `
      <div class="container">
        ${html}
      </div>
    `;
  }
  
  /* ======== Views ======== */
  function renderAbout(){
    mount(`
      <section class="section glass-box">
        <h2>About Me</h2>
        <p class="lead">
          I hold Bachelor's and Master's degrees in Mathematics. I work with data, design, and creative problem-solving.
          I focus on transforming data into meaningful insights and visually engaging experiences.
        </p>
        <p class="muted" style="margin-top:10px">
          Tools: Python, SQL, scikit-learn, TensorFlow, Tableau, Power BI, Figma.
        </p>
      </section>
    `);
  }
  
  function renderProjects(){
    const cards = projects.map(p => `
      <article class="project-card glass-box">
        <img class="project-thumb" src="${p.img}" alt="${p.title}" />
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
        </div>
      </article>
    `).join("");
  
    mount(`
      <section class="section glass-box">
        <h2>Projects</h2>
        <div class="projects-grid">${cards}</div>
      </section>
    `);
  }
  
  function renderContact(){
    mount(`
      <section class="section glass-box">
        <h2>Contact</h2>
        <p class="lead">Have an opportunity or question? Let’s talk.</p>
  
        <div class="contact-list" style="margin-top:14px">
          <p>Email: <a href="mailto:jasyalvikas@gmail.com">jasyalvikas@gmail.com</a></p>
        </div>
  
        <form id="contactForm" style="margin-top:18px; display:grid; gap:10px;">
          <input type="text" name="name" placeholder="Your name" required class="glass-box" />
          <input type="email" name="email" placeholder="Your email" required class="glass-box" />
          <textarea name="message" rows="5" placeholder="Your message" required class="glass-box"></textarea>
          <button class="btn primary" type="submit">Send</button>
        </form>
  
        <p class="muted" id="formStatus" style="margin-top:10px"></p>
      </section>
    `);
  
    // Basic client-side handler (no backend). Creates a mailto link:
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const subject = encodeURIComponent("Portfolio Inquiry");
      const body = encodeURIComponent(
        `Hi Vikas,\n\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}\n\n— Sent from your portfolio`
      );
      const mailto = `mailto:jasyalvikas@gmail.com?subject=${subject}&body=${body}`;
      $("#formStatus").textContent = "Opening your email app…";
      window.location.href = mailto;
    });
  }
  
  function renderNotFound(){
    mount(`
      <section class="section glass-box not-found">
        <h2>Page not found</h2>
        <p class="muted">The page you’re looking for doesn’t exist.</p>
        <p style="margin-top:12px"><a class="btn ghost" href="#/about">Go to About</a></p>
      </section>
    `);
  }
  
  /* ======== Init ======== */
  window.addEventListener("hashchange", navigate);
  window.addEventListener("DOMContentLoaded", () => {
    // Year in footer
    const y = new Date().getFullYear();
    const el = document.getElementById("year");
    if (el) el.textContent = y;
  
    // Initial route
    if (!location.hash) location.hash = "#/about";
    navigate();
  });
  