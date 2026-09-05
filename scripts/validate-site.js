const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const portfolioPages = ['index.html'];
const policyPages = [
  'kuralverse/privacy-policy/index.html',
  'my-thailapuram/privacy-policy/index.html',
  'prompt-lib/privacy-policy/index.html',
  'step-yatra/privacy-policy/index.html',
  'win-your-week/privacy-policy/index.html',
];
const activeHtmlPages = [
  ...portfolioPages,
  ...policyPages,
  'gym/index.html',
  'prompt-lib/privacy.html',
];
const extensionlessRoutes = new Set([
  '/',
  '/gym/',
  '/kuralverse/privacy-policy/',
  '/my-thailapuram/privacy-policy/',
  '/prompt-lib/privacy-policy/',
  '/step-yatra/privacy-policy/',
  '/win-your-week/privacy-policy/',
]);
const failures = [];

function read(file) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    failures.push(`${file}: file is missing`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

function count(source, value) {
  return (source.match(new RegExp(value, 'g')) || []).length;
}

function requireOnce(source, value, label) {
  const occurrences = count(source, value);
  if (occurrences !== 1) failures.push(`${label}: expected one ${value}, found ${occurrences}`);
}

if (!fs.existsSync(path.join(root, 'Balaji_SDET_Resume.pdf'))) {
  failures.push('Balaji_SDET_Resume.pdf: file is missing');
}
if (fs.existsSync(path.join(root, 'projects.html'))) {
  failures.push('projects.html: obsolete endpoint still exists');
}
for (const file of ['about.html', 'experience.html', 'contact.html']) {
  if (fs.existsSync(path.join(root, file))) failures.push(`${file}: obsolete portfolio subpage still exists`);
}

for (const file of portfolioPages) {
  const source = read(file);
  if (!source) continue;
  requireOnce(source, '<!-- shared:site-header -->', file);
  requireOnce(source, '<!-- shared:site-footer -->', file);
  if (!source.includes('Balaji_SDET_Resume.pdf')) failures.push(`${file}: portfolio resume link is missing`);
  if (source.includes('href="/resume.pdf"')) failures.push(`${file}: old resume link remains`);
  if (!source.includes('<main')) failures.push(`${file}: main content is missing`);
}

for (const file of policyPages) {
  const source = read(file);
  if (!source) continue;
  requireOnce(source, '<!-- shared:site-header -->', file);
  requireOnce(source, '<!-- shared:site-footer -->', file);
  if (!source.includes('href="/assets/policy.css"')) failures.push(`${file}: shared policy stylesheet is missing`);
  if (!source.includes('<footer') || !source.includes('Tested with care') || !source.includes('footer-signoff')) failures.push(`${file}: synchronized portfolio footer is missing`);
  if (!source.includes('class="header-logo"') || source.includes('policy-app-name')) failures.push(`${file}: portfolio logo/header is missing or app name leaked into navigation`);
  if (source.includes('Balaji_SDET_Resume.pdf') || source.includes('href="/resume.pdf"')) failures.push(`${file}: policy page contains a resume link`);
  if (!source.includes('class="policy-nav')) failures.push(`${file}: policy navigation variant is missing`);
  if (!source.includes('<main') || !source.includes('Privacy Policy')) failures.push(`${file}: policy content is missing`);
  const head = source.slice(0, source.indexOf('<body'));
  if (head.includes('<a ')) failures.push(`${file}: anchor appears before the body element`);
}

for (const file of [...portfolioPages, ...policyPages]) {
  const source = read(file);
  if (source.includes('href="/projects"') || source.includes('Back to Projects') || source.includes('href="/about"') || source.includes('href="/experience"') || source.includes('href="/contact"')) {
    failures.push(`${file}: obsolete projects endpoint reference remains`);
  }
}

for (const file of activeHtmlPages) {
  const source = read(file);
  const links = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (!link.startsWith('/') || link.startsWith('//') || link.startsWith('/#')) continue;
    const route = link.split(/[?#]/, 1)[0];
    if (route === '/projects' || route === '/projects.html') {
      failures.push(`${file}: obsolete projects endpoint link remains`);
      continue;
    }
    if (extensionlessRoutes.has(route)) continue;
    const target = path.join(root, route.replace(/^\//, '').replaceAll('/', path.sep));
    if (!fs.existsSync(target)) failures.push(`${file}: missing internal target ${link}`);
  }
}

const promptRedirect = read('prompt-lib/privacy.html');
if (!promptRedirect.includes('/prompt-lib/privacy-policy/')) failures.push('prompt-lib/privacy.html: canonical redirect is missing');

const tailwindConfig = read('tailwind.config.js');
if (!tailwindConfig.includes("'./step-yatra/**/*.html'")) failures.push('tailwind.config.js: Step Yatra content path is missing');

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${portfolioPages.length} portfolio pages, ${policyPages.length} policy pages, shared shells, resume asset, and Tailwind paths.`);
