// Optional: subtle fade-in animation for About content
document.querySelectorAll('.about-container img, .about-text').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = 'all 0.6s ease';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 100);
});
