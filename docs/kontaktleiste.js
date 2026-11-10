/* Kontaktleiste oben auf jeder Seite: Telefon, Mobil, WhatsApp, E-Mail.
   Nummern hier eintragen. Leer lassen = Symbol wird nicht angezeigt. */
(function () {
  var KONTAKT = {
    telefon:  '+49 175 6213880',          // Nummer für das Hörer-Symbol (Anrufen)
    mobil:    '',                          // optional zweite Nummer mit Handy-Symbol, z. B. '0171 1234567'
    whatsapp: '+49 175 6213880',          // Handynummer für WhatsApp
    whatsappText: 'Hallo, ich interessiere mich für Ihre Leistungen.',
    email:    'info@objektservice-aw.de'
  };

  function tel(n) { return n.replace(/[^\d+]/g, ''); }
  function wa(n) { var d = n.replace(/\D/g, ''); if (d.indexOf('00') === 0) d = d.slice(2); else if (d.charAt(0) === '0') d = '49' + d.slice(1); return d; }

  var ICON = {
    telefon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mobil: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.13a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.23 8.23 0 1 1 6.87 3.74zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.23 7.5 7.5 0 0 1-1.38-1.71c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.08 4.85 4.85 0 0 0 1.02 2.58c.12.16 1.76 2.68 4.25 3.76.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29z"/>',
    email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'
  };

  function bauen() {
    if (document.getElementById('kontaktleiste')) return;
    var eintraege = [];
    if (KONTAKT.telefon) eintraege.push(['telefon', 'tel:' + tel(KONTAKT.telefon), KONTAKT.telefon, 'Anrufen: ' + KONTAKT.telefon]);
    if (KONTAKT.mobil) eintraege.push(['mobil', 'tel:' + tel(KONTAKT.mobil), KONTAKT.mobil, 'Mobil anrufen: ' + KONTAKT.mobil]);
    if (KONTAKT.whatsapp) eintraege.push(['whatsapp', 'https://wa.me/' + wa(KONTAKT.whatsapp) + (KONTAKT.whatsappText ? '?text=' + encodeURIComponent(KONTAKT.whatsappText) : ''), 'WhatsApp', 'Nachricht per WhatsApp schreiben']);
    if (KONTAKT.email) eintraege.push(['email', 'mailto:' + KONTAKT.email, KONTAKT.email, 'E-Mail schreiben an ' + KONTAKT.email]);
    if (!eintraege.length) return;

    var css = document.createElement('style');
    css.textContent =
      '#kontaktleiste{background:#1c2530;color:#fff;font-size:.875rem;line-height:1}' +
      '#kontaktleiste .kl-in{max-width:72rem;margin:0 auto;padding:0 1rem;display:flex;justify-content:flex-end;align-items:center;gap:.25rem;min-height:2.75rem}' +
      '#kontaktleiste a{display:inline-flex;align-items:center;gap:.5rem;color:#fff;text-decoration:none;padding:.5rem .6rem;border-radius:.5rem;min-height:2.75rem;min-width:2.75rem;justify-content:center;transition:background-color .2s}' +
      '#kontaktleiste a:hover{background:rgba(255,255,255,.12)}' +
      '#kontaktleiste a:focus-visible{outline:2px solid #2e9a64;outline-offset:2px}' +
      '#kontaktleiste svg{width:22px;height:22px;flex:none}' +
      '#kontaktleiste .kl-wa svg{color:#25d366}' +
      '#kontaktleiste .kl-txt{display:none;font-weight:500}' +
      '@media (min-width:640px){#kontaktleiste .kl-in{padding:0 1.5rem;gap:.5rem}#kontaktleiste svg{width:18px;height:18px}}' +
      '@media (min-width:1024px){#kontaktleiste .kl-in{padding:0 2rem}#kontaktleiste .kl-txt{display:inline}}';
    document.head.appendChild(css);

    var leiste = document.createElement('div');
    leiste.id = 'kontaktleiste';
    leiste.setAttribute('role', 'navigation');
    leiste.setAttribute('aria-label', 'Schnellkontakt');
    leiste.innerHTML = '<div class="kl-in">' + eintraege.map(function (e) {
      var extern = e[0] === 'whatsapp' ? ' target="_blank" rel="noopener"' : '';
      return '<a class="kl-' + (e[0] === 'whatsapp' ? 'wa' : e[0]) + '" href="' + e[1] + '"' + extern + ' aria-label="' + e[3] + '" title="' + e[3] + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICON[e[0]] + '</svg>' +
        '<span class="kl-txt">' + e[2] + '</span></a>';
    }).join('') + '</div>';
    document.body.insertBefore(leiste, document.body.firstChild);
  }

  // erst nach dem Laden der Seite einfügen, damit Next.js/React nicht gestört wird
  function start() { setTimeout(bauen, 0); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
