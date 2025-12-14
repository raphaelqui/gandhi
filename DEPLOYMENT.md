# Deployment Guide - Gandhi Restaurant Website

## Voraussetzungen

- Node.js 18+ (LTS empfohlen)
- npm oder yarn
- Google Places API Key
- Vercel Account (optional, aber empfohlen)

## Lokale Entwicklung

### Setup

```bash
# Dependencies installieren
npm install

# Environment Variablen konfigurieren
# Kopiere .env.example zu .env.local und füge deine API Keys ein
cp .env.example .env.local
```

### Entwicklungsserver starten

```bash
npm run dev
# Oder mit yarn
yarn dev
```

Die Seite ist dann verfügbar unter: `http://localhost:3000`

### Build für Production

```bash
npm run build
npm run start
```

## Deployment auf Vercel (empfohlen)

### Step 1: Vercel Account erstellen

- Gehe zu https://vercel.com
- Melde dich mit GitHub/GitLab/Bitbucket an

### Step 2: Repository connecten

1. Klicke auf "Import Project"
2. Wähle dein GitHub Repository aus
3. Vercel wird die Next.js Konfiguration automatisch erkennen

### Step 3: Environment Variablen setzen

1. Gehe zu Project Settings → Environment Variables
2. Füge folgende Variablen hinzu:
   - `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`: Dein Google Places API Key
   - `WHATSAPP_PHONE_NUMBER`: Deine WhatsApp Nummer

### Step 4: Deploy

Klicke auf "Deploy" - Vercel wird den Build automatisch starten

## Deployment auf anderen Servern

### Heroku

```bash
# Heroku CLI installieren
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# App erstellen
heroku create dein-app-name

# Environment Variablen setzen
heroku config:set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key
heroku config:set WHATSAPP_PHONE_NUMBER=your_number

# Deploy
git push heroku main
```

### Docker (für beliebige Server)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

```bash
# Bauen
docker build -t gandhi-restaurant .

# Starten
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key \
  -e WHATSAPP_PHONE_NUMBER=your_number \
  gandhi-restaurant
```

## Environment Variablen

| Variable                            | Beschreibung                   | Erforderlich | Beispiel      |
| ----------------------------------- | ------------------------------ | ------------ | ------------- |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Google Places API Key für Maps | Ja           | `AIzaSy...`   |
| `WHATSAPP_PHONE_NUMBER`             | WhatsApp Telefonnummer         | Ja           | `01627292743` |

## Performance Optimierungen (bereits implementiert)

✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Image Optimization mit Next.js
✅ Code Splitting & Lazy Loading
✅ CSS-in-JS mit MUI
✅ Font Optimization
✅ Video Optimization (autoplay loop muted)

## Testing vor Deployment

```bash
# Build testen
npm run build

# Production Server starten
npm run start

# Performance Check
npm run analyze  # (wenn script existiert)
```

## Checkliste vor Go-Live

- [ ] Alle Environment Variablen sind gesetzt
- [ ] WhatsApp API Nummer ist korrekt
- [ ] Google Maps API Key funktioniert
- [ ] Alle Links und Bilder laden korrekt
- [ ] Mobile Responsive Design ist getestet
- [ ] Kontaktformular funktioniert
- [ ] Video autoplay funktioniert
- [ ] SEO Meta Tags sind aktualisiert

## Häufige Probleme

### "Google Maps zeigt nicht an"

- Google Places API Key ist nicht gesetzt oder ungültig
- Aktiviere "Maps JavaScript API" in deiner Google Cloud Console
- Prüfe die API Restrictions (sollte keine Domain Restrictions haben in Entwicklung)

### "WhatsApp Link funktioniert nicht"

- Prüfe dass die Nummer keine Leerzeichen hat
- Format sollte international sein (z.B. +49...)

### "Build schlägt fehl"

```bash
# Cache löschen
rm -rf .next
npm install
npm run build
```

## Support & Kontakt

Bei Fragen zum Deployment: [hier Kontakt eintragen]
