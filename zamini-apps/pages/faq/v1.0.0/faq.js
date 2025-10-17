document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});
  // ===== 8. FAQ Toggle =====
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const ans = q.nextElementSibling;
      ans.classList.toggle('open');
    });
  });
