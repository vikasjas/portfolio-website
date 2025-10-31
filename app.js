/* ===========================
   app.js — Shared Script
   Used on all pages
=========================== */

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Highlight the active nav link based on current page
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Contact Form Handler (Opens Email Client)
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = encodeURIComponent(formData.get("name"));
    const email = encodeURIComponent(formData.get("email"));
    const message = encodeURIComponent(formData.get("message"));

    // Construct email link
    const subject = encodeURIComponent("Portfolio Inquiry");
    const body = encodeURIComponent(
`Hi Vikas,

Name: ${formData.get("name")}
Email: ${formData.get("email")}

${formData.get("message")}

— Sent from your Portfolio Website`
    );

    // Launch email client
    window.location.href = `mailto:jasyalvikas@gmail.com?subject=${subject}&body=${body}`;

    // Feedback text
    const statusEl = document.getElementById("formStatus");
    if (statusEl) statusEl.textContent = "Opening your email app…";
  });
}

  