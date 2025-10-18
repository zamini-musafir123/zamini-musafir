document.addEventListener('DOMContentLoaded', () => {
  const joinTab = document.getElementById('joinTab');
  if (!joinTab) return;

  // ===== Elements =====
  const supportBtn = joinTab.querySelector('#supportBtn');
  const paypalPopup = joinTab.querySelector('#paypalPopup');
  const donationBtns = joinTab.querySelectorAll('.donation-amount');
  const customAmount = joinTab.querySelector('#customAmount');
  const closeBtn = joinTab.querySelector('#closePaypal');
  const paypalContainer = joinTab.querySelector('#paypal-button-container');

  const updatesForm = joinTab.querySelector('#updatesForm');
  const updatesStatus = joinTab.querySelector('#updates-status');

  let selectedAmount = '5';
  let paypalRendered = false;

  // ===== PayPal Rendering =====
  function renderPayPal(amount) {
    if (!paypalContainer) return;
    paypalContainer.innerHTML = '';
    if (!amount || isNaN(amount) || amount <= 0) return;

    if (typeof paypal === 'undefined') {
      console.error('PayPal SDK not loaded yet.');
      return;
    }

    paypal.Buttons({
      style: { layout: 'vertical', shape: 'rect', label: 'paypal' },
      createOrder: (data, actions) =>
        actions.order.create({ purchase_units: [{ amount: { value: amount } }] }),
      onApprove: (data, actions) =>
        actions.order.capture().then(details => {
          alert('Thanks for your support, ' + details.payer.name.given_name + '!');
        }),
      onError: err => {
        console.error(err);
        alert('Payment could not be completed.');
      }
    }).render('#paypal-button-container');
  }

  // ===== Support Button =====
  supportBtn?.addEventListener('click', () => {
    paypalPopup.classList.toggle('show');
    if (!paypalRendered) {
      renderPayPal(selectedAmount);
      paypalRendered = true;
    }
  });

  closeBtn?.addEventListener('click', () => {
    paypalPopup.classList.remove('show');
  });

  // ===== Donation Buttons =====
  donationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = btn.dataset.amount;
      customAmount.value = '';
      renderPayPal(selectedAmount);
    });
  });

  customAmount?.addEventListener('input', () => {
    donationBtns.forEach(b => b.classList.remove('active'));
    selectedAmount = customAmount.value;
    renderPayPal(selectedAmount);
  });

  // ===== Close PayPal if click outside =====
  document.addEventListener('click', e => {
    if (paypalPopup.classList.contains('show') &&
        !paypalPopup.contains(e.target) &&
        e.target !== supportBtn) {
      paypalPopup.classList.remove('show');
    }
  });

  paypalPopup.addEventListener('click', e => e.stopPropagation());

  // ===== Subscribe Form =====
  updatesForm?.addEventListener('submit', e => {
    e.preventDefault();
    updatesStatus.textContent = 'Subscribing...';
    const email = updatesForm.email.value.trim();
    if (!email) {
      updatesStatus.textContent = 'Enter a valid email!';
      return;
    }
    if (typeof emailjs !== 'undefined') {
      emailjs.send('zamini_musafir', 'template_updates', { email })
        .then(() => {
          updatesStatus.textContent = 'Subscribed successfully!';
          updatesForm.reset();
        })
        .catch(err => {
          console.error(err);
          updatesStatus.textContent = 'Oops! Something went wrong.';
        });
    } else {
      updatesStatus.textContent = 'Email service not available.';
    }
  });
});
