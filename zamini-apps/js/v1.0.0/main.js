document.addEventListener('DOMContentLoaded', () => {


  // ===== 2. Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  // ===== 5. EmailJS Init =====
  if (typeof emailjs !== "undefined") emailjs.init('DhW4bXmuP0VP2d8bF');

  // ===== 6. Feedback Form =====
  const feedbackForm = document.getElementById('contactForm');
  if (feedbackForm) {
    let statusEl = document.getElementById('feedback-status');
    if (!statusEl) {
      statusEl = document.createElement('div');
      statusEl.id = 'feedback-status';
      statusEl.style.marginTop = "8px";
      statusEl.style.color = "green";
      feedbackForm.appendChild(statusEl);
    }
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();
      statusEl.textContent = "Sending...";
      const templateParams = {
        software: feedbackForm.software?.value || "Not selected",
        name: feedbackForm.name?.value || "Anonymous",
        email: feedbackForm.email?.value || "Not provided",
        message: feedbackForm.message?.value || "No message"
      };
      emailjs.send('zamini_musafir', 'template_yz15x2d', templateParams)
        .then(() => { statusEl.textContent = "Feedback sent successfully!"; feedbackForm.reset(); })
        .catch(err => { console.error(err); statusEl.textContent = "Oops! Something went wrong."; });
    });
  }

  // ===== 7. Updates Subscription =====
  const updatesForm = document.getElementById('updatesForm');
  if (updatesForm) {
    const updatesStatus = document.getElementById('updates-status');
    updatesForm.addEventListener('submit', e => {
      e.preventDefault();
      updatesStatus.textContent = "Subscribing...";
      const email = updatesForm.email.value.trim();
      if (!email) { updatesStatus.textContent = "Enter a valid email!"; return; }
      if (typeof emailjs !== "undefined") {
        emailjs.send('zamini_musafir', 'template_updates', { email })
          .then(() => { updatesStatus.textContent = "Subscribed successfully!"; updatesForm.reset(); })
          .catch(err => { console.error(err); updatesStatus.textContent = "Oops! Something went wrong."; });
      } else updatesStatus.textContent = "Email service not available.";
    });
  }



  // ===== 11. Social Load =====
  fetch('social/social.json')
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
          document.getElementById('social-container').innerHTML = html;

          const script = document.createElement('script');
          script.src = files.js;
          document.body.appendChild(script);
        });
    })
    .catch(err => console.error("Social load failed:", err));

  // ===== 12. Quick Links Load =====
  function loadQuickLinks() {
    const section = document.querySelector('.footer-section.quicklinks');
    if (section) {
      fetch('quicklinks/quicklinks.json')
        .then(res => res.json())
        .then(config => {
          const version = config.activeVersion;
          const files = config.versions[version];

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = files.css;
          document.head.appendChild(link);

          return fetch(files.html);// ===== Load Header =====
fetch('header/v1.0.0/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Add CSS for header
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'header/v1.0.0/header.css';
    document.head.appendChild(link);

    // Load its JS (for totalViews etc.)
    const script = document.createElement('script');
    script.src = 'header/v1.0.0/header.js';
    document.body.appendChild(script);
  })
  .catch(err => console.error('Header failed to load:', err));


        })
        .then(res => res.text())
        .then(html => {
          const section = document.querySelector('.footer-section.quicklinks');
          if (section) {
            section.innerHTML = html;
            console.log('✅ Quick Links loaded');
          }
        })
        .catch(err => console.error('Quick Links load failed:', err));
    } else {
      setTimeout(loadQuickLinks, 300);
    }
  }
  loadQuickLinks();

});
document.addEventListener("DOMContentLoaded", () => {
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

document.addEventListener('DOMContentLoaded', () => {
  fetch('chat/chat.json')
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
          document.body.insertAdjacentHTML('beforeend', html);

          const script = document.createElement('script');
          script.src = files.js;
          document.body.appendChild(script);
        });
    });
});
//================== footer============================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Footer Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== 2. Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== 3. Chat Toggle =====
  const chatBtn = document.getElementById('chatBtn');
  const chatBox = document.getElementById('chatBox');
  if (chatBtn && chatBox) {
    chatBtn.addEventListener('click', e => {
      e.stopPropagation();
      chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    });
    window.addEventListener('click', e => {
      if (!e.target.closest('#chatBtn') && !e.target.closest('#chatBox')) {
        chatBox.style.display = 'none';
      }
    });
  }
});


// ===== Load Footer =====
fetch('footer/v1.0.0/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
    // after footer loads, run its JS
    const footerScript = document.createElement('script');
    footerScript.src = 'footer/v1.0.0/footer.js';
    document.body.appendChild(footerScript);
  })
  .catch(err => console.error('Footer failed to load', err));

// ===== Load Header =====
fetch('header/v1.0.0/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Add CSS for header
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'header/v1.0.0/header.css';
    document.head.appendChild(link);

    // Load its JS (for totalViews etc.)
    const script = document.createElement('script');
    script.src = 'header/v1.0.0/header.js';
    document.body.appendChild(script);
  })
  .catch(err => console.error('Header failed to load:', err));



  



// ==========================feature page======================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      const targetId = tab.dataset.tab;
      const targetContainer = document.getElementById(targetId);

      // Remove active class from all tabs & contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate clicked tab & content
      tab.classList.add('active');
      if (targetContainer) targetContainer.classList.add('active');

      // ===== Dynamic Features Loader =====
      if (targetId === 'features-container') {
        try {
          console.log('🔹 Loading Features tab...');

          // Load JSON config
          const res = await fetch('pages/features/features.json');
          if (!res.ok) throw new Error(`Failed to fetch JSON: ${res.status}`);
          const config = await res.json();

          const version = config.activeVersion;
          const files = config.versions[version];

          if (!files) throw new Error(`No version files found for "${version}"`);

          // Load CSS once
          if (!document.querySelector(`link[href="${files.css}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = files.css;
            document.head.appendChild(link);
            console.log(`🔹 Loaded CSS: ${files.css}`);
          }

          // Load HTML
          const htmlRes = await fetch(files.html);
          if (!htmlRes.ok) throw new Error(`Failed to fetch HTML: ${htmlRes.status}`);
          const html = await htmlRes.text();
          targetContainer.innerHTML = html;
          console.log(`🔹 Loaded HTML: ${files.html}`);

          // Load JS once
          if (!document.querySelector(`script[src="${files.js}"]`)) {
            const script = document.createElement('script');
            script.src = files.js;
            script.onload = () => console.log(`🔹 Loaded JS: ${files.js}`);
            script.onerror = () => console.error(`❌ Failed to load JS: ${files.js}`);
            document.body.appendChild(script);
          }

        } catch (err) {
          console.error('❌ Features tab failed:', err);
          if (targetContainer)
            targetContainer.innerHTML = `<p style="color:red;">Error loading Features: ${err.message}</p>`;
        }
      }
    });
  });

  // // ===== Auto-load Features tab on page start =====
  // const featuresTab = document.querySelector('.tab[data-tab="features-container"]');
  // if (featuresTab) featuresTab.click();
});
// ==========================feature page======================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Helper function to load a tab dynamically
  async function loadTab(tabId, jsonPath) {
    const targetContainer = document.getElementById(tabId);
    if (!targetContainer) return;

    try {
      console.log(`🔹 Loading ${tabId}...`);
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);
      const config = await res.json();

      const version = config.activeVersion;
      const files = config.versions[version];

      // --- Load CSS (once per version) ---
      if (!document.querySelector(`link[href="${files.css}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = files.css;
        document.head.appendChild(link);
        console.log(`🔹 Loaded CSS: ${files.css}`);
      }

      // --- Load HTML ---
      const htmlRes = await fetch(files.html);
      if (!htmlRes.ok) throw new Error(`Failed to load HTML: ${htmlRes.status}`);
      const html = await htmlRes.text();
      targetContainer.innerHTML = html;
      console.log(`🔹 Loaded HTML: ${files.html}`);

      // --- Load JS (once per version) ---
      if (!document.querySelector(`script[src="${files.js}"]`)) {
        const script = document.createElement('script');
        script.src = files.js;
        document.body.appendChild(script);
        console.log(`🔹 Loaded JS: ${files.js}`);
      }

    } catch (err) {
      console.error(`❌ ${tabId} load failed:`, err);
      targetContainer.innerHTML = `<p style="color:red;">Error loading ${tabId}: ${err.message}</p>`;
    }
  }

  // Tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Remove active from all tabs & contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate current tab & container
      tab.classList.add('active');
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) targetContainer.classList.add('active');

      // Dynamic loading for Features and About
      if (targetId === 'features-container') {
        loadTab(targetId, 'pages/features/features.json');
      } else if (targetId === 'aboutTab') {
        loadTab(targetId, 'pages/about/about.json');
      }
    });
  });


});






document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  async function loadTab(tabId, jsonPath) {
    const targetContainer = document.getElementById(tabId);
    if (!targetContainer) return;

    try {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);
      const config = await res.json();

      const version = config.activeVersion;
      const files = config.versions[version];

      // Load CSS once
      if (!document.querySelector(`link[href="${files.css}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = files.css;
        document.head.appendChild(link);
      }

      // Load HTML
      const htmlRes = await fetch(files.html);
      if (!htmlRes.ok) throw new Error(`Failed to load HTML: ${htmlRes.status}`);
      const html = await htmlRes.text();
      targetContainer.innerHTML = html;

      // Load JS once
      if (!document.querySelector(`script[src="${files.js}"]`)) {
        const script = document.createElement('script');
        script.src = files.js;
        document.body.appendChild(script);
      }

    } catch (err) {
      console.error(`${tabId} load failed:`, err);
      if (targetContainer) targetContainer.innerHTML = `<p style="color:red;">Error loading ${tabId}: ${err.message}</p>`;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Remove active from all tabs & contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate current tab & container
      tab.classList.add('active');
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) targetContainer.classList.add('active');

      // Dynamic loading
      if (targetId === 'features-container') {
        loadTab(targetId, 'pages/features/features.json');
      } else if (targetId === 'aboutTab') {
        loadTab(targetId, 'pages/about/about.json');
      } else if (targetId === 'updatesTab') {
        loadTab(targetId, 'pages/updates/updates.json');
      }
    });
  });
});





document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;
      showTab(tabId);
    });
  });

  function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    tabs.forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active");
  }

  // Load all dynamic tabs
  const tabJSONs = {
    "aboutTab": "pages/about/about.json",
    "updatesTab": "pages/updates/updates.json",
    "joinTab": "pages/join/join.json",
    "contactTab": "pages/contact/contact.json",
    "aiTab": "pages/faq/faq.json"
  };

  for (const [tabId, jsonPath] of Object.entries(tabJSONs)) {
    loadTabFromJSON(tabId, jsonPath);
  }

  // Loader function
  async function loadTabFromJSON(tabId, jsonPath) {
    try {
      const res = await fetch(jsonPath);
      const data = await res.json();
      const activeVersion = data.activeVersion;
      const versionData = data.versions[activeVersion];

      // Load CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = versionData.css;
      document.head.appendChild(link);

      // Load HTML
      const tabContainer = document.getElementById(tabId);
      const htmlRes = await fetch(versionData.html);
      const htmlText = await htmlRes.text();
      tabContainer.innerHTML = htmlText;

      // Load JS
      const script = document.createElement("script");
      script.src = versionData.js;
      document.body.appendChild(script);

    } catch (err) {
      console.error(`Error loading ${tabId}:`, err);
    }
  }

});













// Load any tab by JSON
function loadTab(tabName, jsonPath, tabId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      const active = data.versions[data.activeVersion];

      // Load CSS
      const linkId = tabName + '-css';
      let linkEl = document.getElementById(linkId);
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.id = linkId;
        linkEl.rel = 'stylesheet';
        document.head.appendChild(linkEl);
      }
      linkEl.href = active.css;

      // Load HTML
      fetch(active.html)
        .then(res => res.text())
        .then(html => {
          document.getElementById(tabId).innerHTML = html;

          // Load JS if any
          if (active.js) {
            const scriptId = tabName + '-js';
            let scriptEl = document.getElementById(scriptId);
            if (!scriptEl) {
              scriptEl = document.createElement('script');
              scriptEl.id = scriptId;
              scriptEl.src = active.js;
              document.body.appendChild(scriptEl);
            }
          }
        })
        .catch(err => console.error('Failed to load HTML:', err));
    })
    .catch(err => console.error('Failed to load JSON:', err));
}

// Example: load products tab
loadTab('products', 'pages/products/products.json', 'productsTab');




document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  async function loadTab(tabId, jsonPath) {
    const targetContainer = document.getElementById(tabId);
    if (!targetContainer) return;

    try {
      const res = await fetch(jsonPath);
      const config = await res.json();
      const version = config.activeVersion;
      const files = config.versions[version];

      // Load CSS
      if (!document.querySelector(`link[href="${files.css}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = files.css;
        document.head.appendChild(link);
      }

      // Load HTML
      const htmlRes = await fetch(files.html);
      const html = await htmlRes.text();
      targetContainer.innerHTML = html;

      // Load JS
      if (!document.querySelector(`script[src="${files.js}"]`)) {
        const script = document.createElement('script');
        script.src = files.js;
        document.body.appendChild(script);
      }

    } catch (err) {
      console.error(`Error loading ${tabId}:`, err);
      targetContainer.innerHTML = `<p style="color:red;">Failed to load ${tabId}: ${err.message}</p>`;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const container = document.getElementById(tabId);
      container?.classList.add('active');

      if (tabId === 'joinTab') loadTab(tabId, 'pages/join/join.json');
    });
  });

  // Auto-load joinTab if active by default
  const defaultTab = document.querySelector('.tab.active') || tabs[0];
  defaultTab?.click();
});
