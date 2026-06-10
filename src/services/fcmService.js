import { getToken } from 'firebase/messaging';
import { messaging } from '../firebaseClient';
import { callFunction } from './apiService';

const VAPID_KEY = 'BOJHdBhJ9DCz0FlXaHnGpOd60Lk29orcf_gwfXX7B-1cPkNPrS9nxeu4DH2Ha-veMiIyXZzsXlBfCQ3uQJCIbuE';

export async function saveFcmToken() {
  try {
    console.log('[FCM] start');
    const permission = await Notification.requestPermission();
    console.log('[FCM] permission:', permission);
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('[FCM] sw registered:', registration.scope);

    const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
    console.log('[FCM] token:', token ? token.slice(0, 20) + '...' : 'null');
    if (!token) return;

    await callFunction('save-fcm-token', { token });
    console.log('[FCM] token saved ok');
  } catch (e) {
    console.warn('[FCM] error:', e);
  }
}
