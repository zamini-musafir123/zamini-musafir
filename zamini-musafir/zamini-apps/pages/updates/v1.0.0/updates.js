document.addEventListener('DOMContentLoaded', () => {
  const updateItems = document.querySelectorAll('.update-item');
  updateItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
    });
  });
});
