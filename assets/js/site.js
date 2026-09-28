(function () {
  var root = document.documentElement;

  // Theme: dark by default, light when chosen. The saved choice is applied
  // early by an inline script in the page head to avoid a flash.
  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  // Mobile menu
  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Copy email
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var label = btn.textContent;
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = label; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
  });

  // Projects page filters
  var filters = document.querySelector('.filters');
  if (filters) {
    var cards = document.querySelectorAll('[data-topics]');
    var empty = document.getElementById('filter-empty');
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var topic = btn.getAttribute('data-topic');
      filters.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var shown = 0;
      cards.forEach(function (card) {
        var topics = card.getAttribute('data-topics').split('|');
        var match = topic === 'all' || topics.indexOf(topic) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  }
})();
