const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the shipped script with a small DOM adapter, without browser dependencies.
function setup({ hash = '', stored = {}, blockedStorage = false, reducedMotion = false } = {}) {
  const nodes = [];
  function element(attrs = {}) {
    const classes = new Set();
    const listeners = {};
    const node = {
      attrs, hidden: false, listeners,
      getAttribute: name => attrs[name] ?? null,
      setAttribute: (name, value) => { attrs[name] = value; },
      removeAttribute: name => { delete attrs[name]; },
      addEventListener: (name, callback) => { listeners[name] = callback; },
      click: () => listeners.click?.(),
      focus: () => { document.activeElement = node; },
      scrollIntoView: options => { node.scrolled = options; },
      classList: {
        contains: name => classes.has(name),
        remove: name => classes.delete(name),
        toggle(name, force = !classes.has(name)) {
          if (force) classes.add(name); else classes.delete(name);
          return force;
        },
      },
    };
    nodes.push(node);
    return node;
  }
  function select(selector) {
    const attribute = selector.match(/^\[([^\]]+)\]$/)?.[1];
    return nodes.filter(node => attribute in node.attrs);
  }
  const root = element();
  const nav = element({ 'data-nav': '' });
  const menu = element({ 'data-nav-toggle': '', 'aria-expanded': 'false' });
  const theme = element({ 'data-theme-toggle': '' });
  const home = element({ id: 'home' });
  const professional = element({ id: 'about', 'data-view-panel': 'professional' });
  const personal = element({ id: 'personal-projects', 'data-view-panel': 'personal' });
  const viewButtons = ['professional', 'personal'].map(view => element({ 'data-view-toggle': view }));
  const navItems = ['professional', 'personal'].map(view => element({ 'data-view-nav': view }));
  const link = element({ 'data-nav-link': '', href: '#about' });
  nav.querySelectorAll = select;
  const documentEvents = {};
  const windowEvents = {};
  const document = {
    documentElement: root,
    querySelector: selector => select(selector)[0],
    querySelectorAll: select,
    getElementById: id => nodes.find(node => node.attrs.id === id),
    addEventListener: (name, callback) => { documentEvents[name] = callback; },
  };
  const window = {
    location: { pathname: '/', hash },
    localStorage: {
      getItem(key) { if (blockedStorage) throw Error('Storage blocked'); return stored[key]; },
      setItem(key, value) { if (blockedStorage) throw Error('Storage blocked'); stored[key] = value; },
    },
    history: { replaceState: (_, __, value) => { window.location.hash = value; } },
    matchMedia: () => ({ matches: reducedMotion }),
    addEventListener: (name, callback) => { windowEvents[name] = callback; },
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../assets/site.js'), 'utf8'), { document, window });
  documentEvents.DOMContentLoaded();
  return { root, nav, menu, theme, home, professional, personal, viewButtons, navItems, link,
    document, window, documentEvents, windowEvents, stored };
}

test('professional view is the default; switching updates content, nav, state and location', () => {
  const app = setup();
  assert.equal(app.personal.hidden, true);
  assert.equal(app.professional.hidden, false);
  app.viewButtons[1].click();
  assert.equal(app.professional.hidden, true);
  assert.equal(app.personal.hidden, false);
  assert.equal(app.navItems[0].hidden, true);
  assert.equal(app.navItems[1].hidden, false);
  assert.equal(app.viewButtons[1].attrs['aria-pressed'], 'true');
  assert.equal(app.viewButtons[0].attrs['aria-pressed'], 'false');
  assert.equal(app.stored['portfolio-view'], 'personal');
  assert.equal(app.window.location.hash, '#home');
});

test('deep links override a conflicting saved view in both directions', () => {
  for (const [hash, saved, visible] of [
    ['#personal-projects', 'professional', 'personal'],
    ['#about', 'personal', 'professional'],
  ]) {
    const app = setup({ hash, stored: { 'portfolio-view': saved } });
    assert.equal(app[visible].hidden, false);
    assert.equal(app[visible].scrolled.behavior, 'auto');
  }
});

test('hash changes reveal hidden sections and safely ignore unknown anchors', () => {
  const app = setup();
  app.window.location.hash = '#personal-projects';
  app.windowEvents.hashchange();
  assert.equal(app.personal.hidden, false);
  app.window.location.hash = '#unknown';
  assert.doesNotThrow(app.windowEvents.hashchange);
  assert.equal(app.personal.hidden, false);
});

test('theme preference persists and toggle labels describe the next action', () => {
  const app = setup({ stored: { 'portfolio-theme': 'dark' } });
  assert.equal(app.root.attrs['data-theme'], 'dark');
  assert.equal(app.theme.attrs['aria-label'], 'Switch to light mode');
  app.theme.click();
  assert.equal(app.root.attrs['data-theme'], 'light');
  assert.equal(app.stored['portfolio-theme'], 'light');
  assert.equal(app.theme.attrs['aria-label'], 'Switch to dark mode');
});

test('menu labels follow state; Escape restores focus; links close the menu', () => {
  const app = setup();
  app.menu.click();
  assert.equal(app.menu.attrs['aria-label'], 'Close menu');
  assert.equal(app.menu.attrs['aria-expanded'], 'true');
  app.documentEvents.keydown({ key: 'Escape' });
  assert.equal(app.menu.attrs['aria-label'], 'Open menu');
  assert.equal(app.menu.attrs['aria-expanded'], 'false');
  assert.equal(app.document.activeElement, app.menu);
  app.menu.click();
  app.link.click();
  assert.equal(app.nav.classList.contains('nav-open'), false);
});

test('blocked storage and reduced motion do not break controls', () => {
  const app = setup({ blockedStorage: true, reducedMotion: true });
  assert.doesNotThrow(() => app.theme.click());
  app.viewButtons[1].click();
  assert.equal(app.personal.hidden, false);
  assert.equal(app.home.scrolled.behavior, 'auto');
});
