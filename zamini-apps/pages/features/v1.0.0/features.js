// Highlight feature on hover or click
document.querySelectorAll('.feature').forEach(f => {
  f.addEventListener('mouseenter', () => f.classList.add('highlight'));
  f.addEventListener('mouseleave', () => f.classList.remove('highlight'));
});
