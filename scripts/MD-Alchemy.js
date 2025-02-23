// Configurazione base di marked
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false
});

// Estendi il renderer di marked
const renderer = new marked.Renderer();

// Configurazione per immagini rotanti
const imageRotationConfig = {
    enabled: false,
    interval: 5000, // Default 5 secondi
    images: [],
    transition: 'fade', // fade, slide, none
    transitionDuration: 500,
    random: true,
    activeRotations: new Map()
};

// Gestione immagini avanzata
renderer.image = function(href, title, text) {
    href = href.replace(/["']/g, '');
    
    // Se c'è un titolo con <news>, crea un box stile notizia
    if (title && title.startsWith('<news>')) {
        const description = title.replace('<news>', '').trim();
        return `
            <div class="news-box">
                <div class="news-image">
                    <img src="${href}" alt="${text}">
                </div>
                <div class="news-content">
                    <h3>${text}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
    }

    // Gestione normale delle immagini con classi
    let classes = '';
    if (title) {
        const classMatch = title.match(/{([^}]*)}/);
        if (classMatch) {
            classes = classMatch[1].replace(/\./g, ' ').trim();
            title = title.replace(classMatch[0], '').trim();
        }
    }

    return `<img src="${href}" alt="${text}"${classes ? ` class="${classes}"` : ''}${title ? ` title="${title}"` : ''}>`;
};

function parseOptions(optionsStr) {
    return optionsStr.split('|').reduce((acc, opt) => {
        const [key, value] = opt.split('=');
        acc[key.trim()] = value.trim();
        return acc;
    }, {});
}

function createImageSection(href, alt, options) {
    return `
        <div class="image-container" style="
            flex: 0 0 ${options.imageWidth || '300px'};
            text-align: center;
        ">
            <img src="${href}" alt="${alt}" style="
                width: 100%;
                height: auto;
                border-radius: 10px;
                border: 2px solid rgba(255,255,255,0.2);
                ${options.imageStyle || ''}
            ">
        </div>
    `;
}

// Gestione paragrafi personalizzata con supporto per box
renderer.paragraph = function(text) {
    // Box personalizzato
    if (text.startsWith(':::box')) {
        const boxMatch = text.match(/:::box({[^}]*})?(\[[^\]]*\])?/);
        const classes = boxMatch[1] ? boxMatch[1].replace(/[{}]/g, '').replace(/\./g, ' ').trim() : '';
        const styles = boxMatch[2] ? boxMatch[2].replace(/[\[\]]/g, '') : '';
        const content = text.replace(boxMatch[0], '').trim();
        
        return `
            <div class="custom-box ${classes}" style="${styles}">
                ${content}
            </div>
        `;
    }

    // Div personalizzato (mantenuto per compatibilità)
    if (text.startsWith(':::div')) {
        const divMatch = text.match(/:::div({[^}]*})?/);
        const classes = divMatch[1] ? divMatch[1].replace(/[{}]/g, '').replace(/\./g, ' ').trim() : '';
        const content = text.replace(divMatch[0], '').trim();
        return `<div class="${classes}">${content}</div>`;
    }

    return `<p>${text}</p>`;
};

renderer.code = function(code, infostring, escaped) {
    // Gestione speciale per imgrect
    if (infostring && infostring.startsWith('imgrect')) {
        try {
            let config = {};
            let text = '';
            
            // Controlla se c'è una configurazione JSON inline
            const configMatch = infostring.match(/imgrect({.*})?/);
            if (configMatch && configMatch[1]) {
                config = JSON.parse(configMatch[1]);
                text = code.trim();
            } else {
                // Fallback al vecchio formato
                config = JSON.parse(code.trim());
                text = config.text || '';
            }
            
            return `
                <div class="content-box" style="
                    background: rgba(0,0,0,0.4);
                    border-radius: 15px;
                    padding: 20px;
                    margin: 20px 0;
                    box-shadow: inset 0 0 20px rgba(${config.titleColor ? hexToRgb(config.titleColor) : '255,255,255'}, 0.1);
                    border: 1px solid rgba(${config.titleColor ? hexToRgb(config.titleColor) : '255,255,255'}, 0.2);
                ">
                    <div class="flex-container" style="
                        display: flex;
                        gap: 30px;
                        flex-direction: ${config.position === 'right' ? 'row-reverse' : 'row'};
                        align-items: center;
                    ">
                        <div class="image-container" style="
                            flex: 0 0 ${config.imageWidth || '200px'};
                            background: rgba(0,0,0,0.4);
                            padding: 20px;
                            border-radius: 10px;
                            border: 1px solid rgba(${config.titleColor ? hexToRgb(config.titleColor) : '255,255,255'}, 0.2);
                        ">
                            <img src="${config.image}" 
                                alt="${config.imageAlt || ''}"
                                style="
                                    width: 100%;
                                    height: auto;
                                    filter: drop-shadow(0 0 10px rgba(${config.titleColor ? hexToRgb(config.titleColor) : '255,255,255'}, 0.5));
                                ">
                        </div>
                        <div class="text-container" style="flex: 1;">
                            ${config.title ? `<h3 style="
                                margin: 0 0 15px 0;
                                color: ${config.titleColor || '#fff'};
                                font-size: 2rem;
                                text-shadow: 0 0 20px ${config.titleColor || '#fff'}80;
                            ">${config.title}</h3>` : ''}
                            <p style="
                                margin: 0;
                                line-height: 1.6;
                                font-size: 1rem;
                                opacity: 0.9;
                            ">${text}</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('Error parsing imgrect config:', e);
            return '<p>Error in imgrect configuration</p>';
        }
    }
    
    // Gestione normale dei blocchi di codice
    const lang = (infostring || '').match(/\S*/)[0];
    return `<pre><code class="${lang}">${
        escaped ? code : code.replace(/[&<>'"]/g, c => 
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])
        )
    }</code></pre>`;
};

// Utility per convertire colori hex in rgb
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : 
        '255,255,255';
}

marked.use({ renderer });

// Determina quale file markdown caricare in base alla pagina corrente
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    // Gestione caso speciale per TestPage
    if (page === 'TestPage') {
        return 'test';
    }
    
    return page === '' || page === 'index' ? 'home' : page;
}

// Carica il contenuto
async function loadContent() {
    try {
        const currentPage = getCurrentPage();
        const response = await fetch(`content/${currentPage}.md`);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('main-content').innerHTML = marked.parse(text);
    } catch (error) {
        console.error('Errore nel caricamento del contenuto:', error);
        document.getElementById('main-content').innerHTML = '<h1>Errore</h1><p>Errore nel caricamento del contenuto.</p>';
    }
}

// Carica il contenuto quando il documento è pronto
document.addEventListener('DOMContentLoaded', loadContent);

// Funzione per gestire la rotazione delle immagini
function startImageRotation(rotationId) {
    const config = imageRotationConfig.activeRotations.get(rotationId);
    if (!config) return;

    const container = document.getElementById(rotationId);
    if (!container) return;

    const img = container.querySelector('img');
    if (!img) return;

    setInterval(() => {
        const nextIndex = config.random ? 
            Math.floor(Math.random() * config.images.length) :
            (config.currentIndex + 1) % config.images.length;

        // Applica la transizione
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = config.images[nextIndex];
            img.style.opacity = '1';
        }, config.duration);

        config.currentIndex = nextIndex;
    }, config.interval);
}

// Aggiungi stili CSS necessari
const rotationStyles = `
.rotating-image-container {
    position: relative;
    overflow: hidden;
}

.rotating-image {
    width: 100%;
    height: auto;
}

.fade-transition {
    transition-property: opacity;
}

.slide-transition {
    transition-property: transform;
}
`;

// Inserisci gli stili nel documento
const styleSheet = document.createElement("style");
styleSheet.textContent = rotationStyles;
document.head.appendChild(styleSheet); 