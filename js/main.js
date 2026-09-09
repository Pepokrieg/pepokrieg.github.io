// Datos de proyectos (los 3 nuevos primeros, luego los 3 originales)
const projects = [
    {
        title: "Orbe Rush",
        description: "Shooter 3D en tercera persona. Eres el Agente E-04, único sobreviviente de una misión. Explora regiones hostiles, elimina enemigos y recolecta orbes mientras descubres una verdad oculta.",
        image: "images/Orb_Rush.png",
        tags: ["Unity", "C#", "Shooter", "3D"],
        link: "https://hellen2025.itch.io/orbe-rush"
    },
    {
        title: "Skelly Scape",
        description: "Aventura y acción con un esqueleto protagonista. Un juego con mecánicas únicas y arte encantador.",
        image: "images/Skelly_Scape.png",
        tags: ["Unity", "2D", "Plataformas"],
        link: "https://alexvalero.itch.io/skelly-scape"
    },
    {
        title: "Disaster Kitten",
        description: "Juego caótico y divertido donde controlas a un gatito que causa desastres. Ideal para sesiones de juego rápidas.",
        image: "images/Disaster_Kitten.png",
        tags: ["Unity", "Casual", "Física"],
        link: "https://dianitafeliz.itch.io/disaster-kitten"
    },
    {
        title: "Endless Running",
        description: "Un carrera infinita con mecánicas de aparición de obstáculos en filas y dificultad progresiva.",
        image: "images/Endless_running.png",
        tags: ["Unity", "C#", "Plataformas"],
        link: "https://pepokrieg.itch.io/endless-running"
    },
    {
        title: "Animal Hunger",
        description: "El mundo y las leyes de la física han enloquecido, los animales silvestres se han vuelto locos por la pizza! aliméntalos o sufre las consecuencias...",
        image: "images/animal_hunger.png",
        tags: ["Unity", "C#", "Shooter"],
        link: "https://pepokrieg.itch.io/animal-hunger"
    },
    {
        title: "Wack a Mole",
        description: "Arcade con mecánicas tipo 'Wack a Mole' pero con comida, los topos se fueron de vacaciones.",
        image: "images/wackamole.png",
        tags: ["Unity", "C#", "Arcade"],
        link: "https://pepokrieg.itch.io/wack-a-mole"
    }
];

let currentIndex = 0; // Índice del proyecto actual (0-5)
let autoPlayInterval;

// Renderizar el slider
function renderSlider() {
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track) return;
    
    // Generar HTML de las tarjetas
    track.innerHTML = projects.map((project, index) => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250?text=${encodeURIComponent(project.title)}'">
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
    
    // Generar 6 puntos (uno por cada proyecto)
    dotsContainer.innerHTML = Array.from({ length: projects.length }, (_, i) => `
        <div class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></div>
    `).join('');
    
    // Agregar eventos a los puntos
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            goToSlide(index);
            resetAutoPlay();
        });
    });
    
    // Actualizar posición del slider
    updateSliderPosition();
}

// Actualizar la posición del slider basado en currentIndex
function updateSliderPosition() {
    const track = document.getElementById('sliderTrack');
    if (!track || track.children.length === 0) return;
    
    const cardWidth = track.children[0].offsetWidth;  // Ancho de 1 tarjeta
    const gap = 32;  // El gap definido en CSS
    const slideWidth = cardWidth + gap;
    
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Actualizar puntos activos
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Función para mover el slider a un proyecto específico
function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, projects.length - 1));
    updateSliderPosition();
}

// Navegación siguiente/anterior (1 en 1)
function nextSlide() {
    if (currentIndex < projects.length - 1) {
        goToSlide(currentIndex + 1);
    } else {
        goToSlide(0); // Vuelve al inicio
    }
    resetAutoPlay();
}

function prevSlide() {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    } else {
        goToSlide(projects.length - 1); // Va al final
    }
    resetAutoPlay();
}

// Autoplay cada 5 segundos
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event listeners
function initSliderControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Pausar autoplay al hacer hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Reajustar al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        updateSliderPosition();
    });
}

// ============================================
// DATOS DE RENDERS POR PROYECTO
// ============================================
const renderProjects = [
    {
        id: 'sturmpanzer',
        title: 'Sturmpanzer 4',
        folder: 'sturmpanzer',
        total: 15,
        start: 1,
        tags: ['Blender', '3ds Max', 'Hard Surfaces', 'Historical', 'Game Asset'],
        description: 'Trabajo en proceso: modelo hecho con seguimiento de planos de blueprints, optimizado para videojuegos, dándole un alto nivel de detalle con mallas de bajo poligonaje (low-poly)'
    },
    {
        id: 'survivors',
        title: 'Survivors Haven',
        folder: 'survivors',
        total: 5,
        start: 16,
        tags: ['Blender', 'Unity', 'Rigging', 'Organic Surface', 'Human Model', 'Gameplay'],
        description: 'Modelos humanoides de jugador y NPC, topología en low-poly y con rigging de Mixamo'
    },
    {
        id: 'scifi',
        title: 'Fortaleza Sci-fi',
        folder: 'sci-fi_build',
        total: 4,
        start: 21,
        tags: ['Blender', 'Sci-Fi', 'Environment Modeling', 'Hard Surface', 'Modular Asset'],
        description: 'Trabajo en proceso: modelo de estructura futurista con alto nivel de detalle y poligonaje.'
    }
];

// ============================================
// GENERAR DATOS DE RENDERS POR PROYECTO
// ============================================
const rendersData = {};
renderProjects.forEach(project => {
    rendersData[project.id] = [];
    for (let i = 0; i < project.total; i++) {
        const num = project.start + i;
        rendersData[project.id].push({
            id: num,
            image: `images/renders/${project.folder}/render_${num}.png`,
            title: `${project.title} - Render ${i + 1}`
        });
    }
});

// ============================================
// ESTADO DE CADA SLIDER DE RENDER
// ============================================
const renderStates = {};
renderProjects.forEach(project => {
    renderStates[project.id] = {
        currentIndex: 0,
        interval: null,
        isVisible: false
    };
});

// ============================================
// FUNCIONES PARA CADA SLIDER DE RENDER
// ============================================
function renderRenderSlider(projectId) {
    const track = document.getElementById(`${projectId}Track`);
    const dotsContainer = document.getElementById(`${projectId}Dots`);
    const project = renderProjects.find(p => p.id === projectId);
    const renders = rendersData[projectId];
    
    if (!track || !project) return;
    
    // Generar HTML
    track.innerHTML = renders.map((render, index) => `
        <div class="project-card render-card" data-project="${projectId}" data-index="${index}">
            <img src="${render.image}" alt="${render.title}" class="project-image render-image" loading="lazy">
            <div class="project-info">
                <h3 class="project-title">${render.title}</h3>
            </div>
        </div>
    `).join('');
    
    // Generar puntos
    dotsContainer.innerHTML = Array.from({ length: renders.length }, (_, i) => `
        <div class="dot ${i === renderStates[projectId].currentIndex ? 'active' : ''}" data-project="${projectId}" data-index="${i}"></div>
    `).join('');
    
    // Eventos de los puntos
    document.querySelectorAll(`#${projectId}Dots .dot`).forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            goToRenderSlide(projectId, index);
            resetRenderAutoPlay(projectId);
        });
    });
    
    // Evento click en tarjetas
    document.querySelectorAll(`#${projectId}Track .render-card`).forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const projectId = this.dataset.project;
            openModal(projectId, index);
        });
    });
    
    updateRenderSliderPosition(projectId);
}

function updateRenderSliderPosition(projectId) {
    const track = document.getElementById(`${projectId}Track`);
    if (!track || track.children.length === 0) return;
    
    const state = renderStates[projectId];
    const cardWidth = track.children[0].offsetWidth;
    const gap = 32;
    const slideWidth = cardWidth + gap;
    
    track.style.transform = `translateX(-${state.currentIndex * slideWidth}px)`;
    
    document.querySelectorAll(`#${projectId}Dots .dot`).forEach((dot, i) => {
        dot.classList.toggle('active', i === state.currentIndex);
    });
}

function goToRenderSlide(projectId, index) {
    const state = renderStates[projectId];
    const renders = rendersData[projectId];
    state.currentIndex = Math.max(0, Math.min(index, renders.length - 1));
    updateRenderSliderPosition(projectId);
}

function nextRenderSlide(projectId) {
    const state = renderStates[projectId];
    const renders = rendersData[projectId];
    if (state.currentIndex < renders.length - 1) {
        goToRenderSlide(projectId, state.currentIndex + 1);
    } else {
        goToRenderSlide(projectId, 0);
    }
    resetRenderAutoPlay(projectId);
}

function prevRenderSlide(projectId) {
    const state = renderStates[projectId];
    const renders = rendersData[projectId];
    if (state.currentIndex > 0) {
        goToRenderSlide(projectId, state.currentIndex - 1);
    } else {
        goToRenderSlide(projectId, renders.length - 1);
    }
    resetRenderAutoPlay(projectId);
}

// ============================================
// AUTOPLAY PARA CADA SLIDER DE RENDER
// ============================================
function startRenderAutoPlay(projectId) {
    const state = renderStates[projectId];
    if (state.interval) clearInterval(state.interval);
    state.interval = setInterval(() => {
        nextRenderSlide(projectId);
    }, 4000);
}

function stopRenderAutoPlay(projectId) {
    const state = renderStates[projectId];
    if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
    }
}

function resetRenderAutoPlay(projectId) {
    const state = renderStates[projectId];
    if (state.interval) {
        clearInterval(state.interval);
        state.interval = null;
    }
    if (state.isVisible) {
        startRenderAutoPlay(projectId);
    }
}

function stopAllRenderAutoplays() {
    renderProjects.forEach(p => stopRenderAutoPlay(p.id));
}

function startAllRenderAutoplays() {
    renderProjects.forEach(p => {
        if (renderStates[p.id].isVisible) {
            startRenderAutoPlay(p.id);
        }
    });
}

// ============================================
// CONTROLES DE CADA SLIDER
// ============================================
function initRenderControls() {
    renderProjects.forEach(project => {
        const prevBtn = document.querySelector(`.prev-btn[data-project="${project.id}"]`);
        const nextBtn = document.querySelector(`.next-btn[data-project="${project.id}"]`);
        const sliderContainer = document.querySelector(`.renders-slider[data-project="${project.id}"]`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => prevRenderSlide(project.id));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => nextRenderSlide(project.id));
        }
        
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => stopRenderAutoPlay(project.id));
            sliderContainer.addEventListener('mouseleave', () => {
                if (renderStates[project.id].isVisible) {
                    startRenderAutoPlay(project.id);
                }
            });
        }
    });
}

// ============================================
// VISIBILIDAD DE CADA SLIDER
// ============================================
function initRenderVisibility() {
    renderProjects.forEach(project => {
        const section = document.querySelector(`.renders-slider[data-project="${project.id}"]`);
        if (!section) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const state = renderStates[project.id];
                if (entry.isIntersecting) {
                    state.isVisible = true;
                    if (!state.interval) {
                        startRenderAutoPlay(project.id);
                    }
                } else {
                    state.isVisible = false;
                    stopRenderAutoPlay(project.id);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(section);
    });
}

// ============================================
// MODAL PARA VER IMAGEN AMPLIADA (ACTUALIZADO)
// ============================================
let currentModalData = { projectId: null, index: 0 };
let modalImagesPreloaded = false;

function preloadAllRenderImages() {
    if (modalImagesPreloaded) return;
    renderProjects.forEach(project => {
        rendersData[project.id].forEach(render => {
            const img = new Image();
            img.src = render.image;
        });
    });
    modalImagesPreloaded = true;
}

function openModal(projectId, index) {
    currentModalData = { projectId, index };
    const renders = rendersData[projectId];
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');
    
    // Forzar recarga de la imagen
    modalImg.src = '';
    setTimeout(() => {
        modalImg.src = renders[index].image;
    }, 50);
    
    modal.style.display = 'flex';
    counter.textContent = `${index + 1} / ${renders.length}`;
    
    // Disparar evento para pausar autoplays
    modal.dispatchEvent(new Event('shown'));
    
    // Pausar todos los autoplays
    stopAllRenderAutoplays();
    stopAutoPlay();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    modal.dispatchEvent(new Event('hidden'));
}

function modalPrev() {
    const { projectId, index } = currentModalData;
    const renders = rendersData[projectId];
    if (index > 0) {
        openModal(projectId, index - 1);
    } else {
        openModal(projectId, renders.length - 1);
    }
}

function modalNext() {
    const { projectId, index } = currentModalData;
    const renders = rendersData[projectId];
    if (index < renders.length - 1) {
        openModal(projectId, index + 1);
    } else {
        openModal(projectId, 0);
    }
}

function initModalControls() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', modalPrev);
    if (nextBtn) nextBtn.addEventListener('click', modalNext);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && modal.style.display === 'flex') modalPrev();
        if (e.key === 'ArrowRight' && modal.style.display === 'flex') modalNext();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Pausar/reanudar autoplays al abrir/cerrar modal
    modal.addEventListener('shown', () => {
        stopAllRenderAutoplays();
        stopAutoPlay();
    });
    
    modal.addEventListener('hidden', () => {
        startAllRenderAutoplays();
        startAutoPlay();
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Precargar imágenes de renders
    preloadAllRenderImages();
    
    // 1. Inicializar cada slider de renders
    renderProjects.forEach(project => {
        renderRenderSlider(project.id);
    });
    initRenderControls();
    initRenderVisibility();
    
    // 2. Inicializar Proyectos Slider
    renderSlider();
    initSliderControls();
    initProjectsAutoplayOnVisibility();
    
    // 3. Inicializar Modal
    initModalControls();
    
    // 4. Funciones de navegación y UI
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
});

// Funciones previas que mantienes
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            return;
        }
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        lastScroll = currentScroll;
    });
}

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

// --- Funciones para Autoplay Inteligente ---

// Variables para controlar si las secciones son visibles
let rendersSectionVisible = false;
let projectsSectionVisible = false;

// Iniciar autoplay de renders solo cuando la sección es visible
function initRenderAutoplayOnVisibility() {
    const section = document.getElementById('renders');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rendersSectionVisible = true;
                startRenderAutoPlay();
            } else {
                rendersSectionVisible = false;
                stopRenderAutoPlay();
            }
        });
    }, { threshold: 0.3 }); // Se activa cuando al menos el 30% de la sección es visible

    observer.observe(section);
}

// Iniciar autoplay de proyectos solo cuando la sección es visible
function initProjectsAutoplayOnVisibility() {
    const section = document.getElementById('work');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSectionVisible = true;
                startAutoPlay();
            } else {
                projectsSectionVisible = false;
                stopAutoPlay();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

// Sobrescribimos las funciones de reset para que solo se activen si la sección es visible
const originalResetRenderAutoPlay = resetRenderAutoPlay;
resetRenderAutoPlay = function() {
    clearInterval(renderAutoPlayInterval);
    if (rendersSectionVisible) {
        startRenderAutoPlay();
    }
};

const originalResetAutoPlay = resetAutoPlay;
resetAutoPlay = function() {
    clearInterval(autoPlayInterval);
    if (projectsSectionVisible) {
        startAutoPlay();
    }
};
