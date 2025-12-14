# School & College Bus Tracker - Tambaram, Tamil Nadu

A real-time bus tracking system for school and college students in Tambaram, Tamil Nadu.

## Features

- 🚌 **Real-Time Tracking** - Live bus location updates
- 📍 **ETA Predictions** - Estimated arrival times at stops
- 🔔 **Notifications** - Bus arrival alerts and updates
- ⭐ **Favorites** - Save frequently used buses and stops
- 💬 **Driver Chat** - Direct communication with bus drivers
- 🆘 **Emergency SOS** - Quick emergency alert system
- 📊 **Analytics** - Trip history and route statistics
- 🌓 **Dark/Light Mode** - Theme toggle
- ♿ **Accessibility** - Screen reader support and font size controls
- 📱 **Offline Mode** - Works offline with cached data
- 🔍 **Search** - Find buses, routes, and stops quickly

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Vercel will auto-detect settings (no build needed for static site)
7. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Drag and drop your project folder or connect a Git repository
4. Click "Deploy"

## Project Structure

```
bus tracker website/
├── index.html          # Main HTML file
├── app.js              # Main application logic
├── style.css           # Styles and themes
├── manifest.json       # PWA manifest
├── vercel.json         # Vercel configuration
└── features/           # Feature modules
    ├── eta.js
    ├── notifications.js
    ├── favorites.js
    ├── search.js
    ├── chat.js
    ├── analytics.js
    ├── sos.js
    ├── theme.js
    ├── accessibility.js
    ├── offline.js
    ├── feedback.js
    └── routePlanning.js
```

## Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

## Notes

- Geolocation requires HTTPS (or localhost) to work
- Service Worker/PWA features work best on HTTPS
- All data is stored locally in browser (localStorage)

## License

This project is for educational purposes.


