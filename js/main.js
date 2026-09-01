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

// Datos de renders (20 imágenes)
const renders = [];
for (let i = 1; i <= 20; i++) {
    renders.push({
        id: i,
        image: `images/renders/render_${i}.png`, // Ajusta la extensión según tus archivos
        title: `Render ${i}`
    });
}

let renderIndex = 0;
let renderAutoPlayInterval;

// Renderizar slider de renders
function renderRendersSlider() {
    const track = document.getElementById('rendersTrack');
    const dotsContainer = document.getElementById('rendersDots');
    
    if (!track) return;
    
    // Generar HTML de las tarjetas de renders
    track.innerHTML = renders.map((render) => `
        <div class="project-card render-card" data-id="${render.id}">
            <img src="${render.image}" alt="${render.title}" class="project-image render-image" loading="lazy">
            <div class="project-info">
                <h3 class="project-title">${render.title}</h3>
            </div>
        </div>
    `).join('');
    
    // Generar puntos
    dotsContainer.innerHTML = Array.from({ length: renders.length }, (_, i) => `
        <div class="dot ${i === renderIndex ? 'active' : ''}" data-index="${i}"></div>
    `).join('');
    
    // Eventos de los puntos
    document.querySelectorAll('#rendersDots .dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            goToRenderSlide(index);
            resetRenderAutoPlay();
        });
    });
    
    // Evento click en tarjetas para abrir modal
    document.querySelectorAll('.render-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            openModal(id);
        });
    });
    
    updateRenderSliderPosition();
}

// Actualizar posición del slider de renders
function updateRenderSliderPosition() {
    const track = document.getElementById('rendersTrack');
    if (!track || track.children.length === 0) return;
    
    const cardWidth = track.children[0].offsetWidth;
    const gap = 32;
    const slideWidth = cardWidth + gap;
    
    track.style.transform = `translateX(-${renderIndex * slideWidth}px)`;
    
    document.querySelectorAll('#rendersDots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === renderIndex);
    });
}

function goToRenderSlide(index) {
    renderIndex = Math.max(0, Math.min(index, renders.length - 1));
    updateRenderSliderPosition();
}

function nextRenderSlide() {
    if (renderIndex < renders.length - 1) {
        goToRenderSlide(renderIndex + 1);
    } else {
        goToRenderSlide(0);
    }
    resetRenderAutoPlay();
}

function prevRenderSlide() {
    if (renderIndex > 0) {
        goToRenderSlide(renderIndex - 1);
    } else {
        goToRenderSlide(renders.length - 1);
    }
    resetRenderAutoPlay();
}

// Autoplay para renders
function startRenderAutoPlay() {
    renderAutoPlayInterval = setInterval(() => {
        nextRenderSlide();
    }, 4000); // Cambia cada 4 segundos (más rápido que proyectos)
}

function resetRenderAutoPlay() {
    clearInterval(renderAutoPlayInterval);
    startRenderAutoPlay();
}

function stopRenderAutoPlay() {
    clearInterval(renderAutoPlayInterval);
}

// Controles de renders
function initRenderControls() {
    const prevBtn = document.getElementById('rendersPrevBtn');
    const nextBtn = document.getElementById('rendersNextBtn');
    const sliderContainer = document.querySelector('.renders-slider');
    
    if (prevBtn) prevBtn.addEventListener('click', prevRenderSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextRenderSlide);
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopRenderAutoPlay);
        sliderContainer.addEventListener('mouseleave', startRenderAutoPlay);
    }
}

// Modal para ver imagen ampliada
let currentModalIndex = 0;

// Mejorar función openModal para que notifique al slider
function openModal(index) {
    currentModalIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');
    
    modal.style.display = 'flex';
    modalImg.src = renders[index].image;
    counter.textContent = `${index + 1} / ${renders.length}`;
    
    // Disparar evento personalizado para que otros componentes sepan que el modal está abierto
    const event = new Event('shown');
    modal.dispatchEvent(event);
    
    // Pausar autoplays al abrir el modal
    stopAutoPlay();
    stopRenderAutoPlay();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Disparar evento personalizado para reanudar
    const event = new Event('hidden');
    modal.dispatchEvent(event);
}

function modalPrev() {
    if (currentModalIndex > 0) {
        openModal(currentModalIndex - 1);
    } else {
        openModal(renders.length - 1);
    }
}

function modalNext() {
    if (currentModalIndex < renders.length - 1) {
        openModal(currentModalIndex + 1);
    } else {
        openModal(0);
    }
}

// Event listeners del modal
function initModalControls() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', modalPrev);
    if (nextBtn) nextBtn.addEventListener('click', modalNext);
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && modal.style.display === 'flex') modalPrev();
        if (e.key === 'ArrowRight' && modal.style.display === 'flex') modalNext();
    });
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Render Slider
    renderRendersSlider();
    initRenderControls();
    // El autoplay de renders se activa solo cuando la sección es visible
    initRenderAutoplayOnVisibility();
    
    // 2. Inicializar Proyectos Slider
    renderSlider();
    initSliderControls();
    // El autoplay de proyectos se activa solo cuando la sección es visible
    initProjectsAutoplayOnVisibility();
    
    // 3. Inicializar Modal (independiente)
    initModalControls();
    
    // 4. Funciones de navegación y UI
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    
    // 5. Pausar autoplays al abrir el modal
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('shown', () => {
            stopRenderAutoPlay();
            stopAutoPlay();
        });
        modal.addEventListener('hidden', () => {
            startRenderAutoPlay();
            startAutoPlay();
        });
    }
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
