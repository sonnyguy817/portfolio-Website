/* global document, window */
const projectCardList = document.querySelectorAll('.project-card');
const modal = document.querySelector('#projectModal');
const closeModal = document.querySelector('.modal-close');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalIcon = document.querySelector('#modalIcon');
const imageContainer = document.querySelector('.slides-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const projectData = [
    {
        title: 'Big Two Game Calculator',
        description: 'This project is a score calculator for the card game Big Two. It tracks gameplay, calculates scores based on card combinations, and provides a user-friendly interface for players. Built with Java and Android Studio, it helped me practice my programming skills and learn about game logic implementation.',
        icon: 'icon/pokerTransparent.png',
        images: ['icon/bigtwo-1.png', 'icon/bigtwo-2.png', 'icon/bigtwo-3.png', 'icon/bigtwo-4.png', 'icon/bigtwo-5.png']
    },
    {
        title: 'To-Do List with AI',
        description: 'A To-Do List app integrated with a personal growth system, leveraging AI to analyze user data and provide personalized insights.',
        icon: 'icon/todoIcon.png',
        images: ['icon/todo-1.png']
    }
];

let slideImages, slideContainer, navDotsList;
let currentIndex = 0;
let imageGap = 10;
let touchStartX = 0;
let touchEndX = 0;

function updateSlide() {
    if (!slideImages || slideImages.length === 0) return;
    const slideWidth = slideImages[0].offsetWidth;
    const containerWidth = slideContainer.offsetWidth;
    const offset = -currentIndex * (slideWidth + imageGap) + (containerWidth - slideWidth) / 2;
    slideContainer.style.transform = `translateX(${offset}px)`;
    updateDots();
}

function updateDots() {
    if (!navDotsList) return;
    navDotsList.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function initializeSlideshow() {
    slideImages = modal.querySelectorAll('.slide');
    slideContainer = modal.querySelector('.slides-container');
    const dotsContainer = modal.querySelector('.nav-dots-container');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    slideImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        });
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                currentIndex = index;
                updateSlide();
            }
        });
        dotsContainer.appendChild(dot);
    });
    navDotsList = dotsContainer.querySelectorAll('.dot');
}

// Touch gesture support
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchMove(e) {
    touchEndX = e.changedTouches[0].screenX;
}

function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0 && currentIndex > 0) {
            currentIndex--;
        } else if (swipeDistance < 0 && currentIndex < slideImages.length - 1) {
            currentIndex++;
        }
        updateSlide();
    }
}

// Focus trapping
function trapFocus(e) {
    const focusableElements = modal.querySelectorAll('button, [tabindex="0"]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

// Button listeners (added once)
nextBtn.addEventListener('click', () => {
    if (!slideImages || slideImages.length === 0) return;
    currentIndex = (currentIndex + 1) % slideImages.length;
    updateSlide();
});
prevBtn.addEventListener('click', () => {
    if (!slideImages || slideImages.length === 0) return;
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    updateSlide();
});

// Project card click handler
projectCardList.forEach((card, index) => {
    card.addEventListener('click', () => {
        const data = projectData[index];
        if (!data) return;

        currentIndex = 0;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalIcon.src = data.icon;

        imageContainer.innerHTML = '';
        data.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('slide');
            img.alt = `${data.title} screenshot`;
            imageContainer.appendChild(img);
        });

        document.body.style.overflow = 'hidden';
        modal.classList.add('modal--open');
        initializeSlideshow();
        setTimeout(updateSlide, 0);
        closeModal.focus();

        // Add touch and focus listeners
        slideContainer.addEventListener('touchstart', handleTouchStart);
        slideContainer.addEventListener('touchmove', handleTouchMove);
        slideContainer.addEventListener('touchend', handleTouchEnd);
        modal.addEventListener('keydown', trapFocus);
    });
});

// Close modal handlers
function closeModalHandler() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    slideContainer.removeEventListener('touchstart', handleTouchStart);
    slideContainer.removeEventListener('touchmove', handleTouchMove);
    slideContainer.removeEventListener('touchend', handleTouchEnd);
    modal.removeEventListener('keydown', trapFocus);
}

closeModal.addEventListener('click', closeModalHandler);
closeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        closeModalHandler();
    }
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalHandler();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
        closeModalHandler();
    }
});

// Back to top
const backToTopButton = document.querySelector('.backToTop');
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// NavIcon links
document.querySelectorAll('.navIcon a').forEach(link => {
    link.setAttribute('target', '_blank');
});

// Toggle link
function toggleLink(element) {
    document.querySelectorAll('.navItem').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
}