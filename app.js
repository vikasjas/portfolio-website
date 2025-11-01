// Smooth fade on load
document.body.style.opacity = "0";
window.addEventListener("load", () => {
  document.body.style.transition = "opacity 1.5s ease";
  document.body.style.opacity = "1";
});


  