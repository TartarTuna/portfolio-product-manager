/* ============================================================
   Weiyun Yu · Portfolio — Interactions
   - Navbar scroll state
   - Mobile hamburger
   - Bilingual (ZH / EN) toggle with localStorage
   - Scroll reveal
   ============================================================ */

(function () {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');

  // ----- Scroll state -----
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  if (burger) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    menu?.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ----- Language toggle -----
  const STORAGE_KEY = 'weiyun.lang';
  const supportedLangs = ['zh', 'en'];
  const defaultLang = 'zh';

  const getLang = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return supportedLangs.includes(stored) ? stored : defaultLang;
  };

  const applyLang = (lang) => {
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    document.documentElement.setAttribute('data-lang', lang);

    // Hide/show elements with data-i18n-show
    document.querySelectorAll('[data-i18n-show]').forEach((el) => {
      const only = el.getAttribute('data-i18n-show');
      el.classList.toggle('is-visible', only === lang);
    });

    // Replace text for elements with data-zh / data-en
    document.querySelectorAll('[data-zh][data-en]').forEach((el) => {
      const val = el.getAttribute(`data-${lang}`);
      if (val != null) el.textContent = val;
    });

    // Toggle buttons state
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    localStorage.setItem(STORAGE_KEY, lang);
  };

  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  applyLang(getLang());

  // ----- Scroll reveal -----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ----- Smooth anchor (for browsers without scroll-behavior) -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Current year -----
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
