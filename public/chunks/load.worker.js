'use strict';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => event.waitUntil(clients.claim()));

console.log('load')

self.addEventListener('message', (e) => {
  console.log(e)
})