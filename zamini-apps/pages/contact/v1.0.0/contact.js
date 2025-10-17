document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contact-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    // Demo: Just show status (replace with EmailJS or server)
    status.textContent = `Thanks ${name}! Your message has been sent.`;
    form.reset();
  });
});
