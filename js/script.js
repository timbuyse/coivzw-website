// Dit script draait op elke pagina van de site. Elk blok checkt zelf of het
// element bestaat, want niet elke pagina heeft bv. een contactformulier.

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav after clicking a link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll-animatie: elementen komen zacht in beeld zodra ze in het zicht scrollen.
//
// De doelen worden hier gekozen in plaats van met attributen in de HTML, zodat
// er niets aan de elf pagina's hoeft te veranderen als we de selectie bijstellen.
// De klasse js-reveal komt pas op <html> als we ook echt animeren; zonder die
// klasse verbergt de CSS niets, dus zonder JavaScript blijft alles zichtbaar.
(function () {
  var wilGeenBeweging = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (wilGeenBeweging || !('IntersectionObserver' in window)) return;

  var selectie = [
    '.section__title', '.section__intro',
    '.prose', '.identity', '.about',
    '.cards > .card',
    '.voorwaarden > .voorwaarde', '.steunvormen > .steunvorm',
    '.projects-grid > .jaar-kop',
    '.projects-grid > .project-card',
    '.board-grid > .board-member',
    '.timeline__item',
    '.doc-list > li',
    '.contact__info', '.contact__form'
  ].join(',');

  var doelen = Array.prototype.slice.call(document.querySelectorAll(selectie));
  if (!doelen.length) return;

  document.documentElement.classList.add('js-reveal');

  // Elementen die naast elkaar staan komen kort na elkaar binnen in plaats van
  // allemaal tegelijk. De teller loopt per ouder, zodat elke rij opnieuw begint.
  var perOuder = {};
  doelen.forEach(function (el) {
    el.classList.add('reveal');

    var ouder = el.parentNode;
    var sleutel = ouder.className || 'los';
    perOuder[sleutel] = (perOuder[sleutel] || 0) + 1;

    var rang = perOuder[sleutel] - 1;
    if (rang > 0 && rang < 8) {
      el.style.setProperty('--reveal-vertraging', (rang * 0.07).toFixed(2) + 's');
    }
  });

  function toon(el) {
    el.classList.add('is-visible');
  }

  var waarnemer = new IntersectionObserver(function (waarnemingen) {
    waarnemingen.forEach(function (w) {
      if (!w.isIntersecting) return;
      toon(w.target);
      waarnemer.unobserve(w.target);
    });
  }, {
    // Iets voor de onderrand aanslaan, zodat het element al beweegt wanneer het
    // in beeld komt in plaats van pas als het er half in staat.
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.05
  });

  doelen.forEach(function (el) {
    waarnemer.observe(el);
  });

  // Vangnet. Onzichtbare inhoud is een ernstiger probleem dan een gemiste
  // animatie, dus na drie seconden wordt alles wat nog verborgen staat gewoon
  // getoond. Dat dekt het geval waarin de waarnemer niet afgaat, bijvoorbeeld
  // in een achtergrondtab of bij een browser die zich anders gedraagt.
  window.setTimeout(function () {
    doelen.forEach(function (el) {
      if (!el.classList.contains('is-visible')) {
        waarnemer.unobserve(el);
        toon(el);
      }
    });
  }, 3000);
}());

// Contact form -> mailto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent(`Contact via website - ${name}`);
    const body = encodeURIComponent(`${message}\n\nVan: ${name} (${email})`);
    window.location.href = `mailto:hedwig.vergeylen@coi.be?subject=${subject}&body=${body}`;
  });
}
