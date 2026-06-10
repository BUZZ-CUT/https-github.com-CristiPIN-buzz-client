importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyB0F0uhekStCkdjrYmO-vMUA0u9-GwLZ4c',
  authDomain: 'buzz-barber.firebaseapp.com',
  projectId: 'buzz-barber',
  storageBucket: 'buzz-barber.firebasestorage.app',
  messagingSenderId: '285098063014',
  appId: '1:285098063014:web:6be3391a70d753e1323067',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {};
  if (!title) return;
  self.registration.showNotification(title, {
    body: body ?? '',
    icon: '/logo192.png',
  });
});
