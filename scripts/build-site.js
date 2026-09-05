const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const templates = path.join(root, 'templates');
const policyPages = [
  'kuralverse/privacy-policy/index.html',
  'my-thailapuram/privacy-policy/index.html',
  'prompt-lib/privacy-policy/index.html',
  'step-yatra/privacy-policy/index.html',
  'win-your-week/privacy-policy/index.html',
];

function readTemplate(name) {
  return fs.readFileSync(path.join(templates, name), 'utf8').trim();
}

function replaceMarkedBlock(source, names, replacement) {
  for (const name of names) {
    const pattern = new RegExp(`<!-- shared:${name} -->[\\s\\S]*?<!-- /shared:${name} -->`, 'm');
    if (pattern.test(source)) return source.replace(pattern, replacement);
  }
  return source;
}

function replaceLegacyBlock(source, startMarker, endPattern, replacement) {
  const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endPattern}`, 'm');
  if (!pattern.test(source)) throw new Error(`Could not find legacy block beginning with ${startMarker}`);
  return source.replace(pattern, replacement);
}

function renderHeader({ variant, brandHref, viewToggle, resumeAction, links }) {
  return readTemplate('site-header.html')
    .replace('{{NAV_VARIANT}}', variant)
    .replace('{{BRAND_HREF}}', brandHref)
    .replace('{{VIEW_TOGGLE}}', viewToggle)
    .replace('{{RESUME_ACTION}}', resumeAction)
    .replace('{{NAV_LINKS}}', links);
}

const homeLinks = `
                    <li><a data-nav-link href="#home" class="block px-2 py-1 hover:text-violet-600 transition-colors">Home</a></li>
                    <li data-view-nav="professional"><a data-nav-link href="#about" class="block px-2 py-1 hover:text-violet-600 transition-colors">About</a></li>
                    <li data-view-nav="professional"><a data-nav-link href="#skills" class="block px-2 py-1 hover:text-violet-600 transition-colors">Skills</a></li>
                    <li data-view-nav="professional"><a data-nav-link href="#certifications" class="block px-2 py-1 hover:text-violet-600 transition-colors">Certifications</a></li>
                    <li data-view-nav="professional"><a data-nav-link href="#experience" class="block px-2 py-1 hover:text-violet-600 transition-colors">Experience</a></li>
                    <li data-view-nav="professional"><a data-nav-link href="#side-projects" class="block px-2 py-1 hover:text-violet-600 transition-colors">Side Projects</a></li>
                    <li data-view-nav="personal" hidden><a data-nav-link href="#personal-projects" class="block px-2 py-1 hover:text-violet-600 transition-colors">Projects</a></li>`;

const policyLinks = `
                <li><a data-nav-link href="/#home" class="block px-2 py-1 hover:text-violet-600 transition-colors">Home</a></li>
                <li><a data-nav-link href="/#about" class="block px-2 py-1 hover:text-violet-600 transition-colors">About</a></li>
                <li><a data-nav-link href="/#experience" class="block px-2 py-1 hover:text-violet-600 transition-colors">Experience</a></li>
                <li><a data-nav-link href="/#personal-projects" class="block px-2 py-1 hover:text-violet-600 transition-colors">Projects</a></li>`;

const viewToggle = `
                    <div class="view-toggle" role="group" aria-label="Portfolio view">
                        <button type="button" data-view-toggle="professional" aria-label="Professional view" title="Professional" aria-pressed="true">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>
                        </button>
                        <button type="button" data-view-toggle="personal" aria-label="Personal view" title="Personal" aria-pressed="false">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/></svg>
                        </button>
                    </div>`;

const resumeAction = '<a href="/Balaji_SDET_Resume.pdf" download="Balaji_SDET_Resume.pdf" class="resume-nav-link">Resume</a>';

function replaceSharedShells(source, header, footer) {
  source = replaceMarkedBlock(source, ['site-header', 'portfolio-nav', 'app-policy-nav'], header);
  if (!source.includes('<!-- shared:site-header -->')) {
    source = replaceLegacyBlock(source, '<!-- ===== Floating Navbar ===== -->', '</nav>\\s*</div>', header);
  }
  source = replaceMarkedBlock(source, ['site-footer', 'portfolio-footer', 'app-policy-footer'], footer);
  if (!source.includes('<!-- shared:site-footer -->')) {
    source = replaceLegacyBlock(source, '<!-- ===== Footer ===== -->', '</footer>', footer);
  }
  return source;
}

function buildPage(file, config) {
  const filePath = path.join(root, file);
  let source = fs.readFileSync(filePath, 'utf8');
  const header = renderHeader(config);
  source = replaceSharedShells(source, header, readTemplate('site-footer.html'));
  if (config.policy) {
    source = source.replace(/\s*<style>\s*\.policy-section[\s\S]*?<\/style>/m, '');
    source = source.replace('<body class="bg-dot-pattern text-gray-900 antialiased min-h-screen selection:bg-violet-100">', '<body class="policy-page bg-dot-pattern text-gray-900 antialiased min-h-screen selection:bg-red-100">');
    if (!source.includes('href="/assets/policy.css"')) {
      source = source.replace('    <link rel="stylesheet" href="/assets/site.css">', '    <link rel="stylesheet" href="/assets/site.css">\n    <link rel="stylesheet" href="/assets/policy.css">');
    }
  }
  source = source.replace(/^[ \t]+$/gm, '');
  fs.writeFileSync(filePath, source);
}

buildPage('index.html', { variant: 'home-nav', brandHref: '#home', viewToggle, resumeAction: '', links: homeLinks, policy: false });
for (const file of policyPages) {
  buildPage(file, { variant: 'policy-nav', brandHref: '/', viewToggle: '', resumeAction: '', links: policyLinks, policy: true });
}
console.log(`Built one shared header/footer for the homepage and ${policyPages.length} app policy pages.`);
