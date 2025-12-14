# Gandhi Restaurant - One Pager Website

Eine moderne, responsive Restaurant-Website mit Speisenkarte, Tischreservierung und Google Maps Integration.

## Features

### 🎨 Design

- Modernes, elegantes Dark Theme mit Gold Accents
- Vollständig responsive (Mobile, Tablet, Desktop)
- Smooth Scroll-Snap Navigation zwischen Slides
- Horizontale Slide Navigation mit Mouse/Touch Support

### 📋 Funktionalität

- **Slide 1**: Hero Section mit Testimonials & Öffnungszeiten

  - Video Background
  - Gast Bewertungen (von Google Places)
  - Restaurant Map & Adresse
  - Öffnungszeiten Übersicht

- **Slide 2**: Menü

  - Speisenkarte mit Kategorien
  - Suchfunktion
  - Allergen-Kennzeichnung
  - Preisanzeige

- **Slide 3**: Tisch Reservieren
  - Reservierungsformular
  - WhatsApp Integration
  - Verfügbarkeitsprüfung

### 🗺️ Integration

- Google Maps mit Custom Pin
- Google Places Bewertungen API
- WhatsApp Business API
- Responsive Google Maps

## Tech Stack

- **Frontend**: Next.js 13+ (React 18+)
- **Styling**: Material-UI (MUI) v5+
- **TypeScript**: Für Type Safety
- **Animations**: Framer Motion
- **Maps**: @react-google-maps/api
- **Icons**: MUI Icons

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Environment Setup

Erstelle eine `.env.local` Datei:

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_API_KEY
WHATSAPP_PHONE_NUMBER=YOUR_PHONE_NUMBER
```

## Projekt Struktur

```
gandhi/
├── components/           # React Komponenten
│   ├── atoms/           # Atom Komponenten (ReviewCarousel, RestaurantMap, etc.)
│   ├── swipexy/         # Slide Navigation System
│   ├── Navbar.tsx
│   ├── MenuSection.tsx
│   ├── ReservationForm.tsx
│   └── SlideIndicator.tsx
├── pages/
│   ├── index.tsx        # Home/Main Page
│   ├── api/
│   │   ├── reservation.ts
│   │   └── reviews.ts
├── public/              # Static Assets
│   ├── videos/
│   └── locales/
├── assets/              # Images & Data Files
│   ├── menu.json
│   └── menuitems.json
├── lib/                 # Utility Functions
├── styles/              # Global Styles
└── types/               # TypeScript Types
```

## Komponenten

### SwipeXYControl

Hauptnavigations-Komponente für horizontale Slide Navigation

- Unterstützt Mouse Wheel & Touch Swipe
- Inner Scroll Detection
- Snap-to-Slide Verhalten

### ReservationForm

Reservierungsformular mit:

- Dark Theme Design
- WhatsApp Integration
- Form Validation
- Success/Error Messages

### MenuSection

Speisenkarte mit:

- Grid Layout (responsive)
- Suchfunktion
- Kategorien Filter
- Allergen Tags

### ReviewCarousel

Automatisches Karussell für Google Places Bewertungen

- Live Google Reviews
- Fadeout Animation
- Responsive Layout

## Styling Überblick

**Primärfarben:**

- Dark: `#171717`
- Gold: `rgb(199, 184, 130)`
- White: `#ffffff`

**Sekundärfarben:**

- Pink/Salmon: `#ef629f`
- Dark Pink Hover: `#d04ed6`
- Success Green: `#66BB6A`

**Fonts:**

- Playfair Display (Headings)
- Montserrat (Body)
- Great Vibes (Logo)

## Responsive Breakpoints

```
xs: 0px      (Mobile Phones)
sm: 600px    (Tablets)
md: 960px    (Desktop)
lg: 1280px   (Large Desktop)
xl: 1920px   (Extra Large)
```

## Performance Tipps

- Images sind optimiert mit Next.js `<Image>`
- Videos sind auf `.mp4` mit `autoplay loop muted`
- CSS-in-JS mit MUI für dynamische Styling
- Lazy Loading für nicht sichtbare Komponenten

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

## Deployment

Siehe [DEPLOYMENT.md](./DEPLOYMENT.md) für detaillierte Deployment Anweisungen.

**Schnell Deploy zu Vercel:**

```bash
npx vercel deploy
```

## SEO Optimierung

- Meta Tags in `pages/index.tsx`
- Open Graph Tags
- Responsive Design (Mobile-First)
- Fast Page Loading
- Semantic HTML

## Weiterer Ausbau

Mögliche Features:

- [ ] Online Bestell System
- [ ] Zahlungsintegration (Stripe/PayPal)
- [ ] Benutzer Authentifizierung
- [ ] Reservierungs Management Dashboard
- [ ] Multi-Language Support
- [ ] Blog/News Sektion
- [ ] Photo Gallery
- [ ] Live Order Status

## Support & Kontakt

Für Fragen oder Probleme:

- 📧 Email: [email@restaurant.de]
- 📞 Phone: +49 XXX XXXXXXX
- 💬 WhatsApp: wa.me/...

## Lizenz

MIT License - Siehe LICENSE Datei
