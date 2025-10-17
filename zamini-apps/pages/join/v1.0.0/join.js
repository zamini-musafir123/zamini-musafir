document.addEventListener('DOMContentLoaded', () => {
  const joinTab = document.getElementById('joinTab');
  if (!joinTab) return;

  const supportBtn = joinTab.querySelector('#supportBtn');
  const paypalPopup = joinTab.querySelector('#paypalPopup');
  const donationBtns = joinTab.querySelectorAll('.donation-amount');
  const customAmount = joinTab.querySelector('#customAmount');
  const closeBtn = joinTab.querySelector('#closePaypal');
  const paypalContainer = joinTab.querySelector('#paypal-button-container');

  let selectedAmount = '5';
  let paypalRendered = false;

  function renderPayPal(amount) {
    paypalContainer.innerHTML = '';
    if (!amount || isNaN(amount) || amount <= 0) return;
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

  // Updates Subscription
  const updatesForm = joinTab.querySelector('#updatesForm');
  const updatesStatus = joinTab.querySelector('#updates-status');

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
  // ===== 9. Support / PayPal =====
  const supportBtn = document.getElementById('supportBtn');
  const paypalPopup = document.getElementById('paypalPopup');
  const donationBtns = document.querySelectorAll('.donation-amount');
  const customAmount = document.getElementById('customAmount');
  let selectedAmount = '5';
  let paypalRendered = false;

  if (supportBtn && paypalPopup) {
    supportBtn.addEventListener('click', () => {
      paypalPopup.classList.toggle('show');
      if (!paypalRendered) {
        renderPayPal(selectedAmount);
        paypalRendered = true;
      }
    });

    donationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        donationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = btn.dataset.amount;
        customAmount.value = '';
        renderPayPal(selectedAmount);
      });
    });

    customAmount.addEventListener('input', () => {
      donationBtns.forEach(b => b.classList.remove('active'));
      selectedAmount = customAmount.value;
      renderPayPal(selectedAmount);
    });

    function renderPayPal(amount) {
      const container = document.getElementById('paypal-button-container');
      container.innerHTML = '';
      if (!amount || isNaN(amount) || amount <= 0) return;
      paypal.Buttons({
        style: { layout: 'vertical', shape: 'rect', label: 'paypal' },
        createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { value: amount } }] }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
          alert('Thanks for your support, ' + details.payer.name.given_name + '!');
        }),
        onError: err => { console.error(err); alert('Payment could not be completed.'); }
      }).render('#paypal-button-container');
    }

    // Close PayPal when clicking outside
    document.addEventListener('click', e => {
      if (paypalPopup.classList.contains('show') && !paypalPopup.contains(e.target) && e.target !== supportBtn) {
        paypalPopup.classList.remove('show');
      }
    });

    paypalPopup.addEventListener('click', e => e.stopPropagation());
  }

  // ===== 10. Header Load =====
  fetch('header/header.json')
    .then(res => res.json())
    .then(config => {
      const version = config.activeVersion;
      const files = config.versions[version];

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = files.css;
      document.head.appendChild(link);

      fetch(files.html)
        .then(res => res.text())
        .then(html => {
          document.getElementById('header-container').innerHTML = html;

          const script = document.createElement('script');
          script.src = files.js;
          document.body.appendChild(script);
        })
        .catch(err => console.error('Header HTML load failed:', err));
    })
    .catch(err => console.error('Header JSON load failed:', err));
