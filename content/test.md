# Test Page - Complete Reference

## 🎨 Color Themes and Styles

### Home (Mana - Yellow)
Main color: `#FBFFBB`

```css
.home-content {
    border-color: #FBFFBB;
    box-shadow: 0 0 20px rgba(251, 255, 187, 0.3);
}
```

Esempio di testo colorato: <span style="color: #FBFFBB">Home Content</span>

---

### Grimoire (Earth - Gold)
Main color: `#FCE595`

```css
.grimoire-content {
    border-color: #FCE595;
    box-shadow: 0 0 20px rgba(252, 229, 149, 0.3);
}
```

Esempio di testo colorato: <span style="color: #FCE595">Grimoire Content</span>

---

### Laboratory (Fire - Red)
Main color: `#DE4A55`

```css
.laboratory-content {
    border-color: #DE4A55;
    box-shadow: 0 0 20px rgba(222, 74, 85, 0.3);
}
```

Esempio di testo colorato: <span style="color: #DE4A55">Laboratory Content</span>

---

### Codex (Aqua - Blue)
Main color: `#70DFFD`

```css
.codex-content {
    border-color: #70DFFD;
    box-shadow: 0 0 20px rgba(112, 223, 253, 0.3);
}
```

Esempio di testo colorato: <span style="color: #70DFFD">Codex Content</span>

---

### Reliquary (Wind - Green)
Main color: `#A8FECA`

```css
.reliquary-content {
    border-color: #A8FECA;
    box-shadow: 0 0 20px rgba(168, 254, 202, 0.3);
}
```

Esempio di testo colorato: <span style="color: #A8FECA">Reliquary Content</span>

---

## 📝 Markdown Guide

### Titoli

```markdown
# H1 Titolo
## H2 Sottotitolo
### H3 Sezione
#### H4 Sottosezione
##### H5 Paragrafo
###### H6 Sottoparagrafo
```

Risultato:
# H1 Titolo
## H2 Sottotitolo
### H3 Sezione
#### H4 Sottosezione
##### H5 Paragrafo
###### H6 Sottoparagrafo

---

### Text Formatting

```markdown
Testo normale
**Testo in grassetto**
*Testo in corsivo*
***Testo in grassetto e corsivo***
`Testo monospace`
~~Testo barrato~~
```

Risultato:
Testo normale
**Testo in grassetto**
*Testo in corsivo*
***Testo in grassetto e corsivo***
`Testo monospace`
~~Testo barrato~~

---

### Lists

```markdown
- Lista non ordinata
  - Sottoelemento
  - Altro sottoelemento
    - Sotto-sottoelemento

1. Lista ordinata
2. Secondo elemento
    1. Sottoelemento numerato
    2. Altro sottoelemento numerato
```

Risultato:
- Lista non ordinata
  - Sottoelemento
  - Altro sottoelemento
    - Sotto-sottoelemento

1. Lista ordinata
2. Secondo elemento
    1. Sottoelemento numerato
    2. Altro sottoelemento numerato

---

### Links and Images

```markdown
[Link normale](https://example.com)
[Link con titolo](https://example.com "Hover per vedere il titolo")
```
![Immagine base](path/to/image.jpg)
![Immagine con classe](path/to/image.jpg "{.img-small}")
![Immagine con più classi](path/to/image.jpg "{.img-small .img-rounded}")
```

Risultato:
```html
[Link normale](https://example.com)
[Link con titolo](https://example.com "Hover per vedere il titolo")
```
```html
![Immagine base](assets/mana.webp)
![Immagine con classe](assets/fire.webp "{.img-small}")
![Immagine con più classi](assets/Aqua.webp "{.img-small .img-rounded}")
```
### Available Image Classes

```css
.img-small     { max-width: 200px; }
.img-medium    { max-width: 400px; }
.img-large     { max-width: 600px; }
.img-rounded   { border-radius: 10px; }
.img-circle    { border-radius: 50%; }
.img-border    { border: 2px solid; }
.img-glow      { box-shadow: 0 0 20px currentColor; }
.img-centered  { display: block; margin: 20px auto; }
```

---

### Code Blocks

```javascript
function example() {
    console.log("Blocco di codice con syntax highlighting");
}
```

```css
.example {
    color: #FCE595;
    text-shadow: 0 0 15px rgba(252, 229, 149, 0.8);
}
```

---

### Custom Divs

```markdown
:::div{.custom-class}
Questo è un div personalizzato con una classe custom
:::

:::div{.alert .alert-info}
Questo è un div con multiple classi
:::
```

Risultato:

:::div{.custom-class}
Questo è un div personalizzato con una classe custom
:::

:::div{.alert .alert-info}
Questo è un div con multiple classi
:::

---

### Box e Layout Avanzati

#### Box Personalizzati
```markdown
:::box{.info-box}[background: rgba(112, 223, 253, 0.1)]
Questo è un box informativo con stile personalizzato
:::

:::box{.warning-box}
⚠️ Questo è un box di avviso
:::

:::box{.danger-box}
🚫 Questo è un box di pericolo
:::

:::box{.success-box}
✅ Questo è un box di successo
:::
```

#### Layout con Immagini e Testo

```imgrect{"image": "assets/mana.webp", "position": "left", "title": "Mana Element", "titleColor": "#FBFFBB", "imageWidth": "200px", "background": "rgba(251, 255, 187, 0.1)"}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
```

```imgrect{"image": "assets/fire.webp", "position": "right", "title": "Fire Element", "titleColor": "#DE4A55", "imageWidth": "200px", "background": "rgba(222, 74, 85, 0.1)"}
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
```

```imgrect{"image": "assets/Aqua.webp", "position": "top", "title": "Aqua Element", "titleColor": "#70DFFD", "imageWidth": "300px", "background": "rgba(112, 223, 253, 0.1)"}
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
```

Opzioni disponibili per il blocco imgrect:
```markdown
```imgrect{"image": "path/to/image.jpg", "position": "left", "title": "Optional Title"}
Il testo può essere scritto qui.
E può andare a capo quando vuoi.
```
```

Opzioni disponibili:
```json
{
    "image": "path/to/image.jpg",      // Percorso dell'immagine
    "position": "left|right|top",      // Posizione dell'immagine
    "title": "Optional Title",         // Titolo (opzionale)
    "titleColor": "#color",            // Colore del titolo
    "titleSize": "1.8rem",             // Dimensione del titolo
    "imageWidth": "200px",             // Larghezza dell'immagine
    "background": "rgba(0,0,0,0.2)",   // Sfondo del box
    "borderRadius": "15px",            // Bordo arrotondato
    "padding": "20px",                 // Spaziatura interna
    "fontSize": "1rem"                 // Dimensione del testo
}
```

---

## 🎯 Special UI Elements

### Status Box (Home)
```html
<div class="status-box">
    <h3>Status</h3>
    <div class="status-item">💻 Working on: project</div>
    <div class="status-item">📚 Reading: book</div>
    <div class="status-item">🎮 Playing: game</div>
</div>
```

### Links Box (Home)
```html
<div class="links-box">
    <h3>Links</h3>
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
</div>
```

---

## ⚡ Animations

### Hover Effects
```css
/* Example of link hover effect */
.nav-bar a:hover {
    text-shadow: 0 0 20px currentColor,
                 0 0 30px currentColor,
                 0 0 40px currentColor;
}

/* Gradient animation */
@keyframes gradient-rotation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

---

## 🖥️ Responsive Notes

```css
/* Desktop (>768px) */
@media screen and (min-width: 769px) {
    .main-container { max-width: 1200px; }
}

/* Tablet (≤768px) */
@media screen and (max-width: 768px) {
    .main-container { width: 95%; }
}

/* Mobile (≤480px) */
@media screen and (max-width: 480px) {
    .nav-bar { padding: 1rem; }
}
```

---

## 🛠️ Useful Snippets

### Content Loading
```javascript
async function loadContent() {
    const currentPage = getCurrentPage();
    const response = await fetch(`content/${currentPage}.md`);
    const text = await response.text();
    document.getElementById('main-content').innerHTML = marked.parse(text);
}
```

### Marked Configuration
```javascript
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false
});
```

This page serves as a complete reference for all elements available in the site. Use the examples above to implement the various features. 