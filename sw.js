self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  clients.claim();
});

self.addEventListener('message', e => {
  const data = e.data;
  if (data.type === 'schedule') {
    setTimeout(() => {
      self.registration.showNotification('タイマー通知', {
        body: data.title,
        icon: 'icon.png',
        vibrate: [200, 100, 200],
        tag: 'timer-alert'
      });
    }, data.delay);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
