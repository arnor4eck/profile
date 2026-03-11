const projects = [
    {
        id: 1,
        name: "Site Checker",
        images: ["images/project-1-1.png", "images/project-1-2.png", "images/project-1-3.png", "images/project-1-4.png"],
        source: "https://github.com/arnor4eck/SitesChecker",
        content: `
            <h2>Мониторинг сайтов</h2>
            <p>Приложение для периодического мониторинга доступности сайтов и отслеживания изменений их контента с графическим интерфейсом.</p>
            <h3>Технологии:</h3>
            <ul>
                <li>Java 21</li>
                <li>JavaFX 21</li>
                <li>SQLite + HikariCP 5.1.0</li>
                <li>OkHttp 5.3.0</li>
            </ul>
            <h3>Особенности:</h3>
            <ul>
                <li>ExecutorService + Virtual Threads</li>
                <li>JDBC</li>
                <li>HttpClient</li>
            </ul>
        `
    },
    {
        id: 2,
        name: "Medicine Notes",
        images: ["images/project-2-1.png", "images/project-2-2.png", "images/project-2-3.png",
                "images/project-2-4.png", "images/project-2-5.png","images/project-2-6.png"],
        source: "https://github.com/arnor4eck/MedicineNotes",
        content: `
            <h2>Medicine Notes</h2>
            <p>Система для отслеживания приема лекарств с возможностью создания шаблонов, управления фактами приема и просмотра статистики.</p>
            <h3>Технологии:</h3>
            <ul>
                <li>Java 21</li>
                <li>Spring Boot</li>
                <li>PostgreSQL</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>Docker</li>
            </ul>
            <h3>Особенности:</h3>
            <ul>
                <li>Кеширование данных</li>
                <li>Ограничение количества запросов</li>
                <li>JWT-аутентификация</li>
                <li>Экспорт отчётов</li>
                <li>Адаптивный интерфейс</li>
            </ul>
        `
    }
];


function showMainPage() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('project-page').classList.add('hidden');
    window.scrollTo(0, 0);
}

function showProjectPage(projectId) {
    const project = projects.find(p => p.id === projectId);

    if (!project) return;

    const projectContent = document.getElementById('project-content');

    const imagesHtml = project.images.map(img =>
        `<img src="${img}" alt="${project.name}" onerror="this.style.display='none'" onclick="openLightbox('${img}')">`
    ).join('');

    const sourceBtnLink = document.getElementById('source-btn-link');
    if (project.source) {
        sourceBtnLink.href = project.source;
        sourceBtnLink.style.display = 'inline-flex';
    } else {
        sourceBtnLink.style.display = 'none';
    }

    projectContent.innerHTML = `
        <div class="project-gallery">
            ${imagesHtml}
        </div>
        ${project.content}
    `;

    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('project-page').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function renderProjects() {
    const container = document.getElementById('projects-container');

    container.innerHTML = projects.map(project => `
        <div class="project-card" onclick="showProjectPage(${project.id})">
            <img src="${project.images[0]}" alt="${project.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="project-card-info">
                <h3>${project.name}</h3>
            </div>
        </div>
    `).join('');
}

function openLightbox(imageSrc) {
    let lightbox = document.getElementById('lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
            <img src="" alt="Full size">
        `;
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
    
    lightbox.querySelector('img').src = imageSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

document.querySelectorAll('a[data-page="main"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            showMainPage();

            const target = document.querySelector(href);

            if (target) 
                target.scrollIntoView({ behavior: 'smooth' });
            
        }
    });
});

document.addEventListener('DOMContentLoaded', renderProjects);
