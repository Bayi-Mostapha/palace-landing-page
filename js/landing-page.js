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
            return;
        }
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// *********************************************

const mobileNavBtn = document.querySelector('.lp-nav-btn');
mobileNavBtn.addEventListener('click', () => {
    document.querySelector('.lp-mobile-nav').classList.toggle('shown');
    mobileNavBtn.classList.toggle('navbar-shown');
});

// ********************************************* Hero height

function updateHeroHeight() {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const oneRemInPixels = rootFontSize;

    // hero 

    const nav_bar = document.querySelector('.lp-navbar');
    const hero_left = document.querySelector('.hero .left');

    const leftHeight = Math.ceil(hero_left.offsetHeight);
    const navHeight = Math.ceil(nav_bar.offsetHeight);

    console.log(window.innerHeight)
    console.log(navHeight + leftHeight + Math.round(leftHeight / 4) + 21 * oneRemInPixels)

    document.documentElement.style.setProperty('--mb-carousel-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 18rem)`);
    document.documentElement.style.setProperty('--mb-hero-circle-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 18rem)`);
    document.documentElement.style.setProperty('--mb-hero-height', `calc(${leftHeight}px + 5rem)`);
    document.documentElement.style.setProperty('--mb-hero-left-height', `${leftHeight}px`);
    document.documentElement.style.setProperty('--mb-hero-right-height', `calc(${leftHeight}px + 4rem)`);
    document.documentElement.style.setProperty('--go-down-pos', `calc(${navHeight + leftHeight}px + 12rem)`);

    // section 1

    const section1_left = document.querySelector('.section1 .left').offsetHeight;

    document.documentElement.style.setProperty('--section1-height', `calc(${section1_left}px + 25px)`);
}

updateHeroHeight();


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

// *********************************************

let radio1 = document.getElementById('image1');
let radio2 = document.getElementById('image2');
let radio3 = document.getElementById('image3');
let carouselItems = document.querySelectorAll('.mb-carousel-item');

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
        radio2.checked = false;
        radio3.checked = false;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= viewportHeight / div && scrollPosition < (viewportHeight / div) * 2) {
        radio1.checked = false;
        radio2.checked = true;
        radio3.checked = false;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= (viewportHeight / div) * 2 && scrollPosition < (viewportHeight / div) * 3) {
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.remove('static');
    } else if (scrollPosition >= (viewportHeight / div) * 3) {
        radio1.checked = false;
        radio2.checked = false;
        radio3.checked = true;
        carousel();
        document.querySelector('.carousel-wrapper').classList.add('static');
    }
}
carouselLogic();

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

// *****************************

// resize event 

window.addEventListener('resize', () => {
    updateImgHeightVariable();
    updateHeroHeight();
    carouselLogic();
});

// scroll event

window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
        faders.forEach(fader => {
            fader.classList.remove('appear');
            appearOnScroll.observe(fader);
        });
    }
    carouselLogic();
});