/* Яндекс.Метрика для одностраничного сайта TRIZINII. */
(function () {
  'use strict';
  const id = window.TRIZINII_METRIKA_ID;
  const local = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const enabled = !local && Number.isSafeInteger(id) && id > 0;
  function record(method, payload) {
    if (local) console.info('[TRIZINII local]', method, JSON.stringify(payload));
  }
  const sections = new Set(['home', 'new', 'men', 'women', 'sale', 'reviews', 'about']);
  let lastUrl = location.href;
  window.triziniiGoal = function (name, params) {
    record('reachGoal', { name: name, params: params || {} });
    if (enabled) window.ym(id, 'reachGoal', name, params || {});
  };
  window.triziniiSection = function (section, updateHistory) {
    if (!sections.has(section)) return;
    const previous = lastUrl;
    const next = new URL(location.href);
    next.hash = section;
    if (next.href === lastUrl) return;
    if (updateHistory !== false) history.pushState(null, '', next.href);
    lastUrl = next.href;
    const heading = document.getElementById(section)?.querySelector('h1, h2');
    const options = {
      title: 'TRIZINII — ' + (heading?.textContent.trim() || section),
      referer: previous
    };
    record('hit', { url: next.href, options: options });
    if (enabled) window.ym(id, 'hit', next.href, options);
  };
  window.addEventListener('popstate', function () {
    window.triziniiSection(location.hash.slice(1) || 'home', false);
  });
  window.addEventListener('hashchange', function () {
    window.triziniiSection(location.hash.slice(1) || 'home', false);
  });
  record('init', { remoteEnabled: enabled, counterId: id, initialUrl: location.href });
})();
