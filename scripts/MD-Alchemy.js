// Configurazione base di marked
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: false
});

// Estendi il renderer di marked
const renderer = new marked.Renderer();

// Gestione immagini personalizzata
renderer.image = function(href, title, text) {
    href = href.replace(/["']/g, '');
    let classes = '';
    let styles = '';
    
    if (title) {
        const classMatch = title.match(/{([^}]*)}/);
        if (classMatch) {
            classes = classMatch[1].replace(/\./g, ' ').trim();
            title = title.replace(classMatch[0], '').trim();
        }
        
        const styleMatch = title.match(/\[([^\]]*)\]/);
        if (styleMatch) {
            styles = styleMatch[1];
            title = title.replace(styleMatch[0], '').trim();
        }
    }

    return `<img src="${href}" alt="${text}"${classes ? ` class="${classes}"` : ''}${styles ? ` style="${styles}"` : ''}${title ? ` title="${title}"` : ''}>`;
};

// Gestione paragrafi personalizzata
renderer.paragraph = function(text) {
    if (typeof text === 'string' && text.startsWith(':::')) {
        const divMatch = text.match(/^:::(\w+)({[^}]*})?/);
        if (divMatch) {
            const tag = divMatch[1];
            const classes = divMatch[2] ? divMatch[2].replace(/[{}]/g, '').replace(/\./g, ' ').trim() : '';
            const content = text.replace(/^:::(\w+)({[^}]*})?/, '').trim();
            return `<${tag}${classes ? ` class="${classes}"` : ''}>${content}</${tag}>`;
        }
    }
    return `<p>${text}</p>`;
};

marked.use({ renderer });

// Determina quale file markdown caricare in base alla pagina corrente
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
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