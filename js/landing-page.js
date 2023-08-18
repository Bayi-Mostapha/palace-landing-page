var loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    loader.style.display = 'none';
    document.body.classList.remove('hide-overflow')
});

// ******************************

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.4
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove('appear');
        } else {
            entry.target.classList.add('appear');
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


let radio1 = document.getElementById('image1');
let radio2 = document.getElementById('image2');
let radio3 = document.getElementById('image3');
let carouselItems = document.querySelectorAll('.carousel-item');

window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    let viewportHeight = window.innerHeight;

    if (scrollPosition < viewportHeight) {
        radio1.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= viewportHeight && scrollPosition < viewportHeight/4 * 2) {
        radio2.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= viewportHeight * 2 && scrollPosition < viewportHeight/4 * 3) {
        radio3.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= viewportHeight * 3 && scrollPosition < viewportHeight/4 * 4) {
        document.querySelector('.carousel-wrapper').classList.add('static');
    }
});

function carousel() {
    if (radio1.checked) {
        carouselItems.forEach(carouselItem => {
            carouselItem.classList.remove('visible');
        });
        document.querySelector('#carousel-item1').classList.add('visible');
    } else if (radio2.checked) {
        carouselItems.forEach(carouselItem => {
            carouselItem.classList.remove('visible');
        });
        document.querySelector('#carousel-item2').classList.add('visible');
    } else if (radio3.checked) {
        carouselItems.forEach(carouselItem => {
            carouselItem.classList.remove('visible');
            document.querySelector('#carousel-item3').classList.add('visible');
        });
    }
}