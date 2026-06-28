import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyALbpxe9DaS-fwNVrVLrehmT6hFRhn5z9k",
  authDomain: "leyratapps.firebaseapp.com",
  projectId: "leyratapps",
  storageBucket: "leyratapps.firebasestorage.app",
  messagingSenderId: "644472339356",
  appId: "1:644472339356:web:ef8b59d8d07057cc8c2659",
  measurementId: "G-MMW3HPMHN4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const appsPerso = [
  { name: 'Suivi Addiction', url: 'https://suiviaddiction.vercel.app/login', icon: '🧠' },
  { name: 'Callisthéni', url: 'https://callistheni-leyrat.vercel.app/', icon: '💪' },
  { name: 'Chez Nous', url: 'https://chez-nous-bebc1.web.app/auth', icon: '🏠' },
];

const appsMilitantisme = [
];

function renderCards(apps, containerId) {
  const container = document.getElementById(containerId);
  if (!apps.length) return;
  container.innerHTML = '';
  apps.forEach(app => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = app.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <span class="card-icon">${app.icon}</span>
      <span class="card-name">${app.name}</span>
    `;
    container.appendChild(a);
  });
}

renderCards(appsPerso, 'persoCards');
renderCards(appsMilitantisme, 'militantismeCards');

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') installBtn.classList.add('hidden');
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  installBtn.classList.add('hidden');
  deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
