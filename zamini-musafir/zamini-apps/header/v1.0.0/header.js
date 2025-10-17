if (typeof firebase !== "undefined") {
  const firebaseConfig = {
    apiKey: "AIzaSyDUUMyJDZXdGa1LyxcESOcth3e3ZPovt-0",
    authDomain: "zaminimusafir.firebaseapp.com",
    projectId: "zaminimusafir",
    storageBucket: "zaminimusafir.firebasestorage.app",
    messagingSenderId: "1066132693199",
    appId: "1:1066132693199:web:8b87e2c3270434891d17ba",
    measurementId: "G-YVCFZ783GR"
  };

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const totalViewsEl = document.getElementById('totalViews');

  if (totalViewsEl) {
    const viewsRef = db.collection("siteStats").doc("totalViews");

    viewsRef.update({ count: firebase.firestore.FieldValue.increment(1) })
      .catch(() => viewsRef.set({ count: 1 }));

    viewsRef.onSnapshot(doc => {
      totalViewsEl.textContent = doc.exists ? doc.data().count || 0 : 0;
    });
  }
}
