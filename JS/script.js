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
        title: 'PetStore Online Reservation App',
        description: 'A hybrid mobile application built with <span>Flutter</span> and <span>Dart</span> for pet owners to manage pet care services. ' +
                    'It integrates <span>Firebase</span> for secure user authentication and real-time data storage. ' +
                    'Key features include:<br>' +
                    '<a href=https://coffee-app-2d6c2.web.app/ target="_blank">Click me to discover more about this app...</a>' +
                    '<ul style="margin-left: 20px; line-height: 1.6;">' +
                    '<li>Member registration via email or Google Sign-In.</li>' +
                    '<li>Profile management to update phone, email, and password with real-time validation.</li>' +
                    '<li>Real-time booking system to schedule and cancel pet care services.</li>' +
                    '<li>Pet news and Pet tips section. </li>' +
                    '<li>Pet community, allow user share their pet photo.</li>' +
                    '</ul>',
        icon: 'icon/icon_rmbg.png',
        images: ['icon/petStore_1.jpg', 'icon/petStore_2.jpg', 'icon/petStore_3.jpg', 'icon/petStore_4.jpg', 'icon/petStore_5.jpg']
    },
    {
        title: 'Big Two Game Calculator',
        description: 'This project is a score calculator for the card game Big Two. ' +
                        'It is a native android app built with <span>Java</span> in <span>Android Studio</span>, the gaming data is stored in the local <span>SQLite</span> Database of the device. The game history can be viewd in the app. ' +
                        'It tracks gameplay and calculates scores based on user input remainings cards, and provides a user-friendly interface for players.'+
                        'Key features include:<br>' +
                        '<ul style="margin-left: 20px; line-height: 1.6;">' +
                        '<li>Score calculation based on remaining cards.</li>' +
                        '<li>Real-time game history tracking via SQL database.</li>' +
                        '<li>Intuitive user interface for easy input.</li>' +
                        '<li>Real-time score updates during gameplay.</li>',
        icon: 'icon/pokerTransparent.png',
        images: ['icon/bigtwo-1.png', 'icon/bigtwo-2.png', 'icon/bigtwo-3.png', 'icon/bigtwo-4.png', 'icon/bigtwo-5.png']
    },
    {
        title: 'To-Do List with AI',
        description: 'A dynamic To-Do List web app with an integrated personal growth system, powered by AI. It is built with <span>Java</span> in <span>Android Studio</span>, The app leverages Hugging Face\'s free chatbot API to analyze user tasks, ' + 
                        'sort them, and offer simple tips to boost productivity and personal growth. '+
                        'Users can track their progress through a scoring system that reflects task completion and growth metrics.'+
                        'Key features include:<br>' +
                        '<ul style="margin-left: 20px; line-height: 1.6;">' +
                        '<li>Task management with AI-driven analysis.</li>' +
                        '<li>Personal growth tips based on task analysis.</li>',
        icon: 'icon/todoIcon.png',
        images: ['icon/todo-1.png','icon/todo-2.png','icon/todo-3.png']
    },
    {
        title: 'Weather Forecast App',
        description: 'A weather app that displays the current weather and forecast for a specific location. It is built with <span>Dart</span> and <span>Flutter</span>, using the <span>OpenWeatherMap API</span> to fetch weather data. Also, provide a activities recommendation based on the weather.',
        icon: 'icon/weatherIcon.png',
        images: ['icon/weather-home.gif', 'icon/weather-1.jpg', 'icon/weather-2.jpg', 'icon/weather-3.jpg']
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

projectCardList.forEach((card, index) => {
    card.addEventListener('click', () => {
        const data = projectData[index];
        if (!data) return;

        currentIndex = 0;
        modalTitle.textContent = data.title;
        modalDescription.innerHTML = data.description;
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

const backToTopButton = document.querySelector('.backToTop');
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});


document.querySelectorAll('.navIcon a').forEach(link => {
    link.setAttribute('target', '_blank');
});

function toggleLink(element) {
    document.querySelectorAll('.navItem').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
}