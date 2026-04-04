// Datos de proyectos desde itch.io
const projects = [
    {
        title: "Mi Primer Juego",
        description: "Un carrera infinita con mecánicas de aparición de obstáculos en filas y dificultad progresiva.",
        image: "images/project1.jpg",
        tags: ["Unity", "C#", "Plataformas"],
        link: "https://pepokrieg.itch.io/endless-running"
    },
    {
        title: "Aventura Épica",
        description: "RPG con narrativa profunda y sistema de combate estratégico.",
        image: "images/project2.jpg",
        tags: ["Unreal", "C++", "RPG"],
        link: "https://pepokrieg.itch.io/animal-hunger"
    },
    {
        title: "Space Shooter",
        description: "Arcade espacial con gráficos retro y jugabilidad adictiva.",
        image: "images/project3.jpg",
        tags: ["Unity", "2D", "Arcade"],
        link: "https://pepokrieg.itch.io/space-shooter"
    }
];

// Función para cargar proyectos
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250?text=Imagen+del+proyecto'">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">Ver en itch.io →</a>
            </div>
        </div>
    `).join('');
}

// Función para cargar proyectos reales desde itch.io
async function loadItchProjects() {
    try {
        // Nota: itch.io no tiene una API pública directa
        // Por ahora usamos datos de ejemplo, pero puedes crear un archivo JSON manualmente
        console.log('Proyectos cargados desde itch.io');
        
        // Si quieres agregar más proyectos, puedes hacerlo aquí
        const response = await fetch('projects.json');
        if (response.ok) {
            const itchProjects = await response.json();
            if (itchProjects.length > 0) {
                loadProjects(itchProjects);
                return;
            }
        }
        loadProjects();
    } catch (error) {
        console.log('Usando datos de proyectos locales');
        loadProjects();
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar menú móvil si está abierto
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Menú móvil toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer para animaciones
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadItchProjects();
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
});
