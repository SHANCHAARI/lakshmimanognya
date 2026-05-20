# Lakshmi Manojna — Portfolio

A cinematic, smooth-scrolling portfolio website built with HTML, CSS, and JavaScript.

## Features

- Aurora background with animated particle network
- Lenis smooth scrolling
- GSAP scroll animations
- Horizontal project gallery (drag + scroll)
- Animated timeline, skill bars, and counters
- Custom cursor and magnetic buttons
- Fully responsive mobile navigation
- GitHub Pages ready (static site)

## Deploy to GitHub Pages

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `lakshmi-portfolio`
3. Set visibility to **Public**
4. Do **not** initialize with README (you already have files)

### 2. Push this folder

```bash
cd portfolio
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lakshmi-portfolio.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**
4. Branch: `main`, folder: `/ (root)`
5. Click **Save**

Your site will be live at:

`https://YOUR_USERNAME.github.io/lakshmi-portfolio/`

(Allow 1–3 minutes for the first deploy.)

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
npx serve .
```

## File structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Customize

- Edit content in `index.html`
- Adjust colors in `:root` variables in `css/style.css`
- Add project links by wrapping cards in `<a href="...">` tags

## Contact

**Simhambhatla Lakshmi Manojna**  
lakshmimanognyasimhambhatla03@gmail.com · +91 91005 93095
