document.addEventListener('DOMContentLoaded', () => {
  const social = document.querySelector('.social');
  if (!social) return;

  // Optional: collapse/expand on hover for small screens
  if (window.innerWidth <= 900) {
    social.addEventListener('mouseenter', () => social.style.transform = 'translateY(0)');
    social.addEventListener('mouseleave', () => social.style.transform = 'translateY(-50%)');
  }
});
