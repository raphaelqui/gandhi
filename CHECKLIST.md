# Pre-Production Checklist

## Sicherheit ✓

- [ ] Alle API Keys sind in `.env.local` gespeichert (nicht in Code)
- [ ] `.env.local` ist in `.gitignore`
- [ ] Keine sensiblen Daten in `public/` Verzeichnis
- [ ] HTTPS ist auf Production Domain aktiviert
- [ ] CORS ist korrekt konfiguriert
- [ ] Rate Limiting für API Endpoints ist aktiviert
- [ ] Input Validation auf allen API Routen implementiert

## Performance ✓

- [ ] Production Build erstellt erfolgreich: `npm run build`
- [ ] Keine Console Errors/Warnings
- [ ] Images sind optimiert (WebP Format)
- [ ] CSS ist minifiziert
- [ ] JavaScript ist minifiziert & tree-shaken
- [ ] Lazy Loading für unkritische Komponenten
- [ ] Google PageSpeed Score > 80
- [ ] Mobile Performance Score > 80

## Responsive Design ✓

- [ ] Mobile (375px) - alle Komponenten responsive
- [ ] Tablet (768px) - Layout OK
- [ ] Desktop (1024px+) - Layout OK
- [ ] Extra Large (1920px+) - Layout OK
- [ ] Touch Targets sind mindestens 44x44px
- [ ] Horizontal Scroll funktioniert auf Mobile
- [ ] Video Background responsive
- [ ] Google Maps responsive

## Funktionalität ✓

- [ ] Slide Navigation funktioniert
- [ ] Inner Scroll Detection funktioniert
- [ ] Navbar Buttons navigieren korrekt
- [ ] SlideIndicator zeigt richtige Position
- [ ] Menü Suchfunktion funktioniert
- [ ] Allergen Tags sind sichtbar
- [ ] Reservierungsformular funktioniert
- [ ] WhatsApp Integration funktioniert
- [ ] Google Maps zeigt Standort
- [ ] Google Places Bewertungen laden
- [ ] Video autoplay funktioniert
- [ ] Alle externen Links funktionieren

## Browser Kompatibilität ✓

- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+
- [ ] iOS Safari 14+
- [ ] Android Chrome 90+

## SEO ✓

- [ ] Meta Title ist aussagekräftig
- [ ] Meta Description ist optimiert
- [ ] Open Graph Tags sind konfiguriert
- [ ] Structured Data (Schema.org) ist implementiert
- [ ] Sitemap.xml existiert
- [ ] robots.txt ist konfiguriert
- [ ] Canonical URLs sind gesetzt
- [ ] Alt Text für alle Bilder

## Analytics & Tracking ✓

- [ ] Google Analytics ist konfiguriert
- [ ] Event Tracking für wichtige User Actions
- [ ] Error Tracking (z.B. Sentry) eingerichtet
- [ ] Performance Monitoring aktiv

## Daten & API ✓

- [ ] Alle API Keys sind gültig
- [ ] Google Places API ist aktiviert
- [ ] Google Maps JavaScript API ist aktiviert
- [ ] WhatsApp Phone Number ist korrekt
- [ ] Menu JSON Daten sind aktuell
- [ ] Restaurant Informationen sind korrekt
- [ ] Öffnungszeiten sind aktuell
- [ ] Adresse ist korrekt

## Deployment ✓

- [ ] Environment Variablen sind auf Production gesetzt
- [ ] Database Connections sind aktiv
- [ ] Logging ist konfiguriert
- [ ] Backups sind eingerichtet
- [ ] CDN ist konfiguriert
- [ ] SSL/TLS Certificate ist gültig
- [ ] Domain ist auf Production Server gezeigt
- [ ] Email Notifications sind eingerichtet

## Monitoring ✓

- [ ] Uptime Monitoring ist aktiv
- [ ] Error Logging ist konfiguriert
- [ ] Performance Monitoring ist aktiv
- [ ] Security Scanning ist aktiv
- [ ] Regular Backups sind eingerichtet
- [ ] Disaster Recovery Plan existiert

## Dokumentation ✓

- [ ] README.md ist aktuell
- [ ] DEPLOYMENT.md ist aktuell
- [ ] API Dokumentation existiert
- [ ] Code Comments sind vorhanden
- [ ] Team ist trainiert auf System

## Kommunikation ✓

- [ ] Team kennt Production URL
- [ ] Notfall Kontakte sind definiert
- [ ] Change Log wird geführt
- [ ] User Support Prozess existiert
- [ ] Feedback Kanäle sind offen

## Post-Deployment ✓

- [ ] Monitoring für erste 24h aktiv
- [ ] Team ist für Notfälle erreichbar
- [ ] Analytics Daten werden gesammelt
- [ ] User Feedback wird gesammelt
- [ ] Performance wird überwacht
- [ ] Security wird überwacht

---

## Problembehebung

### Build schlägt fehl?

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Performance Issue?

```bash
npm run analyze  # Analysiere Bundle Größe
```

### API Fehler?

- Prüfe Environment Variablen
- Prüfe API Keys Gültigkeit
- Prüfe API Rate Limits
- Prüfe Server Logs

---

**Deployment Status**: [ ] READY | [ ] NOT READY

**Letzte Überprüfung**: ****\_\_****
**Von**: ****\_\_****
**Datum**: ****\_\_****
