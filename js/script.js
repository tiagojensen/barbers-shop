const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const previewButton = document.querySelector('.preview-button');
const toast = document.querySelector('.toast');
const instagramLinks = document.querySelectorAll('[data-instagram-url]');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

previewButton?.addEventListener('click', () => {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});

instagramLinks.forEach((instagramLink) => instagramLink.addEventListener('click', (event) => {
  event.preventDefault();

  const webUrl = instagramLink.dataset.instagramUrl;
  let appOpened = false;
  let fallbackTimer;

  const cleanup = () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.clearTimeout(fallbackTimer);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      appOpened = true;
      cleanup();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.location.href = 'instagram://app';

  fallbackTimer = window.setTimeout(() => {
    if (!appOpened) {
      cleanup();
      window.location.href = webUrl;
    }
  }, 900);
}));
