document.addEventListener('DOMContentLoaded', () => {
  const downloadButtons = document.querySelectorAll('.btn-download');
  downloadButtons.forEach(btn => {
    const countEl = btn.nextElementSibling; // <span class="count">
    btn.addEventListener('click', () => {
      if (countEl) {
        let count = parseInt(countEl.textContent) || 0;
        count += 1;
        countEl.textContent = count;
      }
    });
  });
});
