document.addEventListener('DOMContentLoaded', () => {

  // ===== Footer Year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Newsletter Subscription =====
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  if (newsletterBtn && newsletterEmail) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      if (!email) return alert('Please enter a valid email!');
      alert(`Subscribed with ${email}!`);
      newsletterEmail.value = '';
    });
  }

  // ===== Quick Links Dynamic Load =====
  const quicklinks = document.querySelector('.footer-section.quicklinks');
  if (quicklinks) {
    fetch('footer/quicklinks.json')
      .then(res => res.json())
      .then(config => {
        quicklinks.innerHTML = config.html || '';
      })
      .catch(err => console.error('Quicklinks load failed', err));
  }

  // ===== Link Social Buttons to global social =====
  const globalSocial = document.querySelectorAll("#globalSocial a");
  const footerSocial = document.querySelectorAll(".footer-social a");
  footerSocial.forEach(footerBtn => {
    const platform = footerBtn.dataset.platform;
    const match = Array.from(globalSocial).find(btn => btn.dataset.platform === platform);
    if (match) {
      footerBtn.href = match.href;
      footerBtn.target = match.target;
    }
  });
});
  // ===== 1. Footer Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
