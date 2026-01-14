importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCpFo1Ox3_Ev_ZwpXIpRv6BI4umSsJvto0", // SW can't read process.env
  authDomain: "tpo-pwa-test.firebaseapp.com",
  projectId: "tpo-pwa-test",
  messagingSenderId: "2010549029",
  appId: "1:2010549029:web:d546b3c018fb76cbd528cc"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});