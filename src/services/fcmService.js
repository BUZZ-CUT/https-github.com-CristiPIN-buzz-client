import { getToken } from 'firebase/messaging';
import { messaging } from '../firebaseClient';
import { callFunction } from './apiService';

const VAPID_KEY = 'BOJHdBhJ9DCz0FlXaHnGpOd60Lk29orcf_gwfXX7B-1cPkNPrS9nxeu4DH2Ha-veMiIyXZzsXlBfCQ3uQJCIbuE';

export async function saveFcmToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
    if (!token) return;

    await callFunction('save-fcm-token', { token });
  } catch (e) {
    // notificările sunt opționale — nu blocăm fluxul
    console.warn('FCM token error:', e);
  }
}
