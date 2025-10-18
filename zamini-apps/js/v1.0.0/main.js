// ================================================== 1. MAIN DOMCONTENTLOADED ==================================================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 1.1 Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { //anchor variable: <a> tag (aka an anchor tag in HTML).
    anchor.addEventListener('click', function (e) { // function is event
      e.preventDefault(); // prevent default anchor jump
      const target = document.querySelector(this.getAttribute('href')); // get target element
      if (target) target.scrollIntoView({ behavior: 'smooth' }); // scroll smoothly
    });
  });

  // ===== 1.2 EmailJS Init =====
  if (typeof emailjs !== "undefined") emailjs.init('DhW4bXmuP0VP2d8bF'); // initialize EmailJS if loaded

  // ===== 1.3 Feedback Form =====
  const feedbackForm = document.getElementById('contactForm'); // get feedback form
  if (feedbackForm) {
    let statusEl = document.getElementById('feedback-status'); // get or create status element
    if (!statusEl) {
      statusEl = document.createElement('div'); // create div for status
      statusEl.id = 'feedback-status'; // assign id
      statusEl.style.marginTop = "8px"; // spacing
      statusEl.style.color = "green"; // text color
      feedbackForm.appendChild(statusEl); // append to form
    }
    feedbackForm.addEventListener('submit', e => { // handle submit event
      e.preventDefault(); // prevent page reload
      statusEl.textContent = "Sending..."; // show sending message
      const templateParams = { // collect form data
        software: feedbackForm.software?.value || "Not selected",
        name: feedbackForm.name?.value || "Anonymous",
        email: feedbackForm.email?.value || "Not provided",
        message: feedbackForm.message?.value || "No message"
      };
      emailjs.send('zamini_musafir', 'template_yz15x2d', templateParams) // send feedback
        .then(() => { statusEl.textContent = "Feedback sent successfully!"; feedbackForm.reset(); }) // success
        .catch(err => { console.error(err); statusEl.textContent = "Oops! Something went wrong."; }); // error handling
    });
  }


  
  // ===== 1.4 Updates Subscription =====
  const updatesForm = document.getElementById('updatesForm'); // get subscription form
  if (updatesForm) {
    const updatesStatus = document.getElementById('updates-status'); // status element
    updatesForm.addEventListener('submit', e => { // handle submit
      e.preventDefault(); // prevent reload
      updatesStatus.textContent = "Subscribing..."; // show subscribing
      const email = updatesForm.email.value.trim(); // get trimmed email
      if (!email) { updatesStatus.textContent = "Enter a valid email!"; return; } // validation
      if (typeof emailjs !== "undefined") { // check EmailJS
        emailjs.send('zamini_musafir', 'template_updates', { email }) // send subscription
          .then(() => { updatesStatus.textContent = "Subscribed successfully!"; updatesForm.reset(); }) // success
          .catch(err => { console.error(err); updatesStatus.textContent = "Oops! Something went wrong."; }); // error
      } else updatesStatus.textContent = "Email service not available."; // fallback
    });
  }

  // ===== 1.5 Social Load =====
  fetch('social/social.json') // fetch social config
    .then(res => res.json()) // parse JSON
    .then(config => {
      const version = config.activeVersion; // get active version
      const files = config.versions[version]; // get version files

      const link = document.createElement('link'); // create CSS link
      link.rel = 'stylesheet'; 
      link.href = files.css; 
      document.head.appendChild(link); // append CSS

      fetch(files.html) // fetch HTML
        .then(res => res.text())
        .then(html => {
          document.getElementById('social-container').innerHTML = html; // insert social HTML

          const script = document.createElement('script'); // create script
          script.src = files.js; 
          document.body.appendChild(script); // append script
        });
    })
    .catch(err => console.error("Social load failed:", err)); // error handling

  // ===== 1.6 Quick Links Load =====
  function loadQuickLinks() { // function to load quick links
    const section = document.querySelector('.footer-section.quicklinks'); // select section
    if (section) {
      fetch('quicklinks/quicklinks.json') // fetch JSON
        .then(res => res.json()) // parse JSON
        .then(config => {
          const version = config.activeVersion; // active version
          const files = config.versions[version]; // version files

          const link = document.createElement('link'); // create CSS link
          link.rel = 'stylesheet';
          link.href = files.css;
          document.head.appendChild(link); // append CSS

          return fetch(files.html); // fetch HTML
        })
        .then(res => res.text()) // parse HTML
        .then(html => {
          const section = document.querySelector('.footer-section.quicklinks'); // select section again
          if (section) {
            section.innerHTML = html; // insert HTML
            console.log('✅ Quick Links loaded'); // log success
          }
        })
        .catch(err => console.error('Quick Links load failed:', err)); // error
    } else {
      setTimeout(loadQuickLinks, 300); // retry after 300ms
    }
  }
  loadQuickLinks(); // initial call

});
// ================================================== 3. CHAT WIDGET LOAD ==================================================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 3.1 Load Chat Widget =====
  fetch('chat/chat.json') // fetch chat config
    .then(res => res.json()) // parse JSON
    .then(config => {
      const version = config.activeVersion; // active version
      const files = config.versions[version]; // version files

      const link = document.createElement('link'); // create CSS link
      link.rel = 'stylesheet';
      link.href = files.css;
      document.head.appendChild(link); // append CSS

      fetch(files.html) // fetch chat HTML
        .then(res => res.text()) // parse HTML
        .then(html => {
          document.body.insertAdjacentHTML('beforeend', html); // insert HTML

          const script = document.createElement('script'); // create script
          script.src = files.js;
          document.body.appendChild(script); // append script
        });
    });

});


// ================================================== 2. FOOTER SOCIAL SYNC ==================================================
document.addEventListener("DOMContentLoaded", () => {

  // ===== 2.1 Sync Footer Social =====
  const globalSocial = document.querySelectorAll("#globalSocial a"); // get global links
  const footerSocial = document.querySelectorAll(".footer-social a"); // get footer links

  footerSocial.forEach(footerBtn => { // sync each footer link
    const platform = footerBtn.dataset.platform; 
    const match = Array.from(globalSocial).find(btn => btn.dataset.platform === platform); // find match
    if (match) {
      footerBtn.href = match.href; // copy href
      footerBtn.target = match.target; // copy target
    }
  });

});


// ================================================== 4. FOOTER SECTION ==================================================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 4.1 Footer Year =====
  const yearEl = document.getElementById("year"); // select year element
  if (yearEl) yearEl.textContent = new Date().getFullYear(); // update year

  // ===== 4.2 Smooth Scroll (Footer) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { // select anchors
    anchor.addEventListener('click', function (e) { // click event
      e.preventDefault(); // prevent default
      const target = document.querySelector(this.getAttribute('href')); // target element
      if (target) target.scrollIntoView({ behavior: 'smooth' }); // scroll smoothly
    });
  });

  // ===== 4.3 Chat Toggle =====
  const chatBtn = document.getElementById('chatBtn'); // get chat button
  const chatBox = document.getElementById('chatBox'); // get chat box
  if (chatBtn && chatBox) {
    chatBtn.addEventListener('click', e => { // toggle chat
      e.stopPropagation(); 
      chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
    });
    window.addEventListener('click', e => { // close on outside click
      if (!e.target.closest('#chatBtn') && !e.target.closest('#chatBox')) {
        chatBox.style.display = 'none';
      }
    });
  }

});

// ================================================== 5. LOAD FOOTER HTML ==================================================
fetch('footer/v1.0.0/footer.html') // fetch footer
  .then(res => res.text()) // parse HTML
  .then(html => {
    document.getElementById('footer-container').innerHTML = html; // insert footer

    const footerScript = document.createElement('script'); // create footer JS script
    footerScript.src = 'footer/v1.0.0/footer.js';
    document.body.appendChild(footerScript); // append script
  })
  .catch(err => console.error('Footer failed to load', err)); // error



  



// ================================================== 6. FEATURE PAGE ==================================================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 6.1 Select Tabs and Contents =====
  const tabs = document.querySelectorAll('.tab'); // select all tab buttons
  const tabContents = document.querySelectorAll('.tab-content'); // select all tab content containers

  // ===== 6.2 Helper Function: Load Tab Dynamically =====
  async function loadTab(tabId, jsonPath) { // function to load tab content dynamically
    const targetContainer = document.getElementById(tabId); // get the container element
    if (!targetContainer) return; // if no container, exit

    try {
      console.log(`🔹 Loading ${tabId}...`); // log start
      const res = await fetch(jsonPath); // fetch JSON config
      if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`); // check fetch
      const config = await res.json(); // parse JSON

      const version = config.activeVersion; // get active version
      const files = config.versions[version]; // get files for this version

      // --- 6.2.1 Load CSS (once per version) ---
      if (!document.querySelector(`link[href="${files.css}"]`)) {
        const link = document.createElement('link'); // create link element
        link.rel = 'stylesheet'; 
        link.href = files.css; 
        document.head.appendChild(link); // append CSS
        console.log(`🔹 Loaded CSS: ${files.css}`); // log success
      }

      // --- 6.2.2 Load HTML ---
      const htmlRes = await fetch(files.html); // fetch HTML
      if (!htmlRes.ok) throw new Error(`Failed to load HTML: ${htmlRes.status}`); // check fetch
      const html = await htmlRes.text(); // parse HTML
      targetContainer.innerHTML = html; // insert into container
      console.log(`🔹 Loaded HTML: ${files.html}`); // log success

      // --- 6.2.3 Load JS (once per version) ---
      if (!document.querySelector(`script[src="${files.js}"]`)) {
        const script = document.createElement('script'); // create script element
        script.src = files.js; 
        document.body.appendChild(script); // append JS
        console.log(`🔹 Loaded JS: ${files.js}`); // log success
      }

    } catch (err) {
      console.error(`❌ ${tabId} load failed:`, err); // log error
      targetContainer.innerHTML = `<p style="color:red;">Error loading ${tabId}: ${err.message}</p>`; // show error
    }
  }

  // ===== 6.3 Tab Click Event Handler =====
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab; // get target container id

      // --- 6.3.1 Remove Active Classes ---
      tabs.forEach(t => t.classList.remove('active')); // remove active from all tabs
      tabContents.forEach(c => c.classList.remove('active')); // remove active from all contents

      // --- 6.3.2 Activate Clicked Tab & Container ---
      tab.classList.add('active'); // mark clicked tab as active
      const targetContainer = document.getElementById(targetId); // get container
      if (targetContainer) targetContainer.classList.add('active'); // mark container active

      // --- 6.3.3 Dynamic Loading Based on Tab ---
      if (targetId === 'features-container') {
        loadTab(targetId, 'pages/features/features.json'); // load features tab
      } else if (targetId === 'aboutTab') {
        loadTab(targetId, 'pages/about/about.json'); // load about tab
      }
    });
  });

  // ===== 6.4 Optional: Auto-load Features Tab on Page Start =====
  // const featuresTab = document.querySelector('.tab[data-tab="features-container"]');
  // if (featuresTab) featuresTab.click();

});





// ================================================== 7. MULTI-TAB DYNAMIC LOADER ==================================================
document.addEventListener('DOMContentLoaded', () => {

  // ===== 7.1 Select Tabs and Tab Contents =====
  const tabs = document.querySelectorAll('.tab'); // select all tab buttons
  const tabContents = document.querySelectorAll('.tab-content'); // select all tab containers

  // ===== 7.2 Helper Function: loadTab =====
  async function loadTab(tabId, jsonPath) { // load individual tab dynamically
    const targetContainer = document.getElementById(tabId); // get container
    if (!targetContainer) return; // exit if not found

    try {
      const res = await fetch(jsonPath); // fetch JSON config
      if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`); // check response
      const config = await res.json(); // parse JSON

      const version = config.activeVersion; // active version
      const files = config.versions[version]; // version files

      // --- 7.2.1 Load CSS once ---
      if (!document.querySelector(`link[href="${files.css}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = files.css;
        document.head.appendChild(link); // append CSS
      }

      // --- 7.2.2 Load HTML ---
      const htmlRes = await fetch(files.html);
      if (!htmlRes.ok) throw new Error(`Failed to load HTML: ${htmlRes.status}`);
      const html = await htmlRes.text();
      targetContainer.innerHTML = html; // insert HTML

      // --- 7.2.3 Load JS once ---
      if (!document.querySelector(`script[src="${files.js}"]`)) {
        const script = document.createElement('script');
        script.src = files.js;
        script.onload = () => console.log(`✅ ${tabId} JS loaded`); // ensures JS runs after load
        document.body.appendChild(script); // append JS
      }

    } catch (err) {
      console.error(`${tabId} load failed:`, err); // log error
      if (targetContainer)
        targetContainer.innerHTML = `<p style="color:red;">Error loading ${tabId}: ${err.message}</p>`; // show error
    }
  }

  // ===== 7.3 Tab Click Event =====
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab; // get target id

      // Remove active classes from all tabs & contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate clicked tab & container
      tab.classList.add('active');
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) targetContainer.classList.add('active');

      // Dynamic loading based on tab
      if (targetId === 'productsTab') {
        loadTab(targetId, 'pages/products/products.json');
      } else if (targetId === 'features-container') {
        loadTab(targetId, 'pages/features/features.json');
      } else if (targetId === 'aboutTab') {
        loadTab(targetId, 'pages/about/about.json');
      } else if (targetId === 'updatesTab') {
        loadTab(targetId, 'pages/updates/updates.json');
      } else if (targetId === 'joinTab') {
        loadTab(targetId, 'pages/join/join.json');
      } else if (targetId === 'contactTab') {
        loadTab(targetId, 'pages/contact/contact.json');
      } else if (targetId === 'aiTab') {
        loadTab(targetId, 'pages/faq/faq.json');
      }

    });
  });

  // ===== 7.4 Show Tab Function =====
  function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active")); // hide all
    document.getElementById(tabId).classList.add("active"); // show selected
    tabs.forEach(t => t.classList.remove("active")); // deactivate all tabs
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active"); // activate selected tab
  }

  // ===== 7.5 Preload All Dynamic Tabs =====
  const tabJSONs = { // mapping of tabId -> JSON path
    "productsTab": "pages/products/products.json",
    "aboutTab": "pages/about/about.json",
    "updatesTab": "pages/updates/updates.json",
    "joinTab": "pages/join/join.json",
    "contactTab": "pages/contact/contact.json",
    "aiTab": "pages/faq/faq.json"
  };


  for (const [tabId, jsonPath] of Object.entries(tabJSONs)) {
    loadTabFromJSON(tabId, jsonPath); // preload each tab
  }

// ===== 7.6 Loader Function for Preload =====
async function loadTabFromJSON(tabId, jsonPath) {
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);
    const data = await res.json();
    const activeVersion = data.activeVersion;
    const versionData = data.versions[activeVersion];

    // --- Load CSS ---
    if (!document.querySelector(`link[href="${versionData.css}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = versionData.css;
      document.head.appendChild(link);
    }

    // --- Load HTML ---
    const tabContainer = document.getElementById(tabId);
    const htmlRes = await fetch(versionData.html);
    if (!htmlRes.ok) throw new Error(`Failed to load HTML: ${htmlRes.status}`);
    const htmlText = await htmlRes.text();
    tabContainer.innerHTML = htmlText;

    // --- Load JS AFTER HTML is inserted ---
    if (!document.querySelector(`script[src="${versionData.js}"]`)) {
      const script = document.createElement("script");
      script.src = versionData.js;
      script.onload = () => {
        console.log(`✅ ${tabId} JS loaded`);
        if (tabId === "joinTab" && typeof initJoinTab === "function") {
          initJoinTab();
        }
      };
      document.body.appendChild(script);
    } else {
      // JS already exists, still call init
      if (tabId === "joinTab" && typeof initJoinTab === "function") {
        initJoinTab();
      }
    }

  } catch (err) {
    console.error(`Error loading ${tabId}:`, err);
    const tabContainer = document.getElementById(tabId);
    if (tabContainer)
      tabContainer.innerHTML = `<p style="color:red;">Error loading ${tabId}: ${err.message}</p>`;
  }
} // <-- THIS closes loadTabFromJSON properly

});


// ================================================== 8. HEADER DYNAMIC LOADER ==================================================
document.addEventListener('DOMContentLoaded', () => {
  // --- 8.1 Load Header Configuration JSON ---
  fetch('header/header.json')
    .then(res => res.json())
    .then(config => {
      const version = config.activeVersion; // get current version
      const files = config.versions[version]; // get file paths

      // --- 8.2 Inject Header CSS ---
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = files.css;
      document.head.appendChild(link);

      // --- 8.3 Load Header HTML ---
      fetch(files.html)
        .then(res => res.text())
        .then(html => {
          document.getElementById('header-container').innerHTML = html;

          // --- 8.4 Load Header JS ---
          const script = document.createElement('script');
          script.src = files.js;
          document.body.appendChild(script);
        })
        .catch(err => console.error('Header HTML load failed:', err));
    })
    .catch(err => console.error('Header JSON load failed:', err));
});
