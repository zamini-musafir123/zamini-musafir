const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');

if (chatBtn && chatBox) {
  // Toggle chat box
  chatBtn.addEventListener('click', e => {
    e.stopPropagation();
    chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
  });

  // Close chat when clicking outside
  window.addEventListener('click', e => {
    if (!e.target.closest('#chatBtn') && !e.target.closest('#chatBox')) {
      chatBox.style.display = 'none';
    }
  });
}

// Handle chat form submission
const chatForm = document.getElementById('chatForm');
if (chatForm) {
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    alert(`Thanks ${chatForm.name.value}! Your message has been sent.`);
    chatForm.reset();
    chatBox.style.display = 'none';
  });
}
