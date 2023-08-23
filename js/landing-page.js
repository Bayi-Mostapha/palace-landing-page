var loader = document.querySelector('.loader');

window.addEventListener('DOMContentLoaded', () => {
    loader.style.display = 'none';
    document.body.classList.remove('hide-overflow')
});

// ****************************** Intersection observer

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
        faders.forEach(fader => {
            fader.classList.remove('appear');
            appearOnScroll.observe(fader);
        })
    }
});

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// ********************************************* Hero height

function updateHeroHeight() {

    // hero 

    const nav_bar = document.querySelector('.lp-navbar');
    const hero_left = document.querySelector('.hero .left');

    const leftHeight = Math.ceil(hero_left.offsetHeight);
    const navHeight = Math.ceil(nav_bar.offsetHeight);

    document.documentElement.style.setProperty('--mb-carousel-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 21rem)`);
    document.documentElement.style.setProperty('--mb-hero-circle-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 21rem)`);
    document.documentElement.style.setProperty('--mb-hero-height', `calc(${leftHeight + Math.round(leftHeight / 4)}px + 4rem)`);
    document.documentElement.style.setProperty('--mb-hero-left-height', `${leftHeight}px`);
    document.documentElement.style.setProperty('--mb-hero-right-height', `${leftHeight + Math.round(leftHeight / 4)}px`);

    // section 1

    const section1_left = document.querySelector('.section1 .left').offsetHeight;

    document.documentElement.style.setProperty('--section1-height', `calc(${section1_left}px + 25px)`);
}

updateHeroHeight();
window.addEventListener('resize', updateHeroHeight);


// *********************************************

const images = document.querySelectorAll('.hero .mb-carousel-item');

function updateImgHeightVariable() {
    images.forEach(image => {
        const heroImg = image.querySelector('img').offsetHeight;
        const halfCircle = image.querySelector('.circle2').offsetHeight / 2;
        document.documentElement.style.setProperty('--img-height', (heroImg - halfCircle) + 'px');
    });
}

updateImgHeightVariable();
window.addEventListener('resize', updateImgHeightVariable);


// *********************************************

let radio1 = document.getElementById('image1');
let radio2 = document.getElementById('image2');
let radio3 = document.getElementById('image3');
let carouselItems = document.querySelectorAll('.mb-carousel-item');

carouselLogic();
window.addEventListener('scroll', carouselLogic);
window.addEventListener('resize', carouselLogic);

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
function carouselLogic() {
    let scrollPosition = window.scrollY;
    let viewportHeight = window.innerHeight;
    let div = 4;

    if (viewportHeight > 800) {
        document.documentElement.style.setProperty('--div-height', 200 + 'px');
        viewportHeight = 800;
    } else {
        document.documentElement.style.setProperty('--div-height', 25 + 'vh');
    }

    if (scrollPosition < viewportHeight / div) {
        radio1.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= viewportHeight / div && scrollPosition < (viewportHeight / div) * 2) {
        radio2.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= (viewportHeight / div) * 2 && scrollPosition < (viewportHeight / div) * 3) {
        radio3.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= (viewportHeight / div) * 3) {
        document.querySelector('.carousel-wrapper').classList.add('static');
    }
}

// ******************************

const scrollButton = document.querySelector(".go-down");
const targetSection = document.getElementById("go-down-dest"); //dest = destination

scrollButton.addEventListener("click", function () {
    targetSection.scrollIntoView({ behavior: "smooth" });
});

// ******************************

const ns = document.querySelectorAll('.n');
let occ = 1;

ns.forEach(n => {
    if (occ < 10)
        n.innerHTML = '0' + occ;
    else
        n.innerHTML = occ;
    occ++;
});