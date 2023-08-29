const root = document.documentElement;

// ************************************************

var loader = document.querySelector('.loader');

window.addEventListener('DOMContentLoaded', () => {
    loader.style.display = 'none';
    document.body.classList.remove('hide-overflow');
    updateHeroHeight();
    updateImgHeightVariable();
    carouselLogic();
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
const mobileNav = document.querySelector('.lp-mobile-nav');
mobileNavBtn.addEventListener('click', () => {
    if (!mobileNav.classList.contains('shown')) {
        mobileNav.classList.add('shown');
        mobileNavBtn.classList.add('navbar-shown');
        document.body.classList.add('hide-overflow');
    } else {
        mobileNav.classList.remove('shown');
        mobileNavBtn.classList.remove('navbar-shown');
        document.body.classList.remove('hide-overflow');
    }
});

// ********************************************* Hero height

function updateHeroHeight() {
    const rootFontSize = parseFloat(getComputedStyle(root).fontSize);
    const oneRemInPixels = rootFontSize;

    const nav_bar = document.querySelector('.lp-navbar');
    const hero_left = document.querySelector('.hero .left');

    const leftHeight = Math.ceil(hero_left.offsetHeight);
    const navHeight = Math.ceil(nav_bar.offsetHeight);

    if (window.innerWidth > 850) {
        root.style.setProperty('--mb-carousel-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 18rem)`);
        root.style.setProperty('--mb-hero-circle-height', `calc(${navHeight + leftHeight + Math.round(leftHeight / 4)}px + 18rem)`);
        root.style.setProperty('--mb-hero-height', `calc(${leftHeight}px + 5rem)`);
        root.style.setProperty('--mb-hero-left-height', `${leftHeight}px`);
        root.style.setProperty('--mb-hero-right-height', `calc(${leftHeight}px + 4rem)`);
        root.style.setProperty('--go-down-pos', `calc(${navHeight + leftHeight}px + 12rem)`);
    } else {
        root.style.setProperty('--mb-carousel-height', `calc(${navHeight + leftHeight * 2 + Math.round(leftHeight / 4)}px + 18rem)`);
        root.style.setProperty('--mb-hero-circle-height', `calc(${navHeight + leftHeight * 2 + Math.round(leftHeight / 4)}px + 18rem)`);
        root.style.setProperty('--mb-hero-height', `calc(${leftHeight * 2}px + 5rem)`);
        root.style.setProperty('--mb-hero-left-height', `${leftHeight}px`);
        root.style.setProperty('--mb-hero-right-height', `calc(${leftHeight}px + 4rem)`);
        root.style.setProperty('--go-down-pos', `calc(${navHeight + leftHeight * 2}px + 12rem)`);
    }

    const section1_left = document.querySelector('.section1 .left').offsetHeight;
    const section1_right = document.querySelector('.section1 .right .girl').offsetHeight;
    const quest_mark = document.querySelector('.section1 .right .quest-mark').offsetHeight;

    if (window.innerWidth > 900) {
        root.style.setProperty('--section1-height', `${Math.max(section1_left, section1_right) + quest_mark + 55}px`);
    } else {
        root.style.setProperty('--section1-height', `${section1_left + section1_right + quest_mark + 175}px`);
    }

    const section2_right = document.querySelector('.section2 .body .right').offsetHeight;
    if (window.innerWidth > 900) {
        root.style.setProperty('--s2-body-height', 52 + 'rem');
    } else {
        root.style.setProperty('--s2-body-height', `calc(${section2_right}px + 55rem)`);
    }

    const s2_right = document.querySelector('.section2 .body .right');
    const s2_left = document.querySelector('.section2 .body .left');

    if (window.innerWidth > 900) {
        const available_space = window.innerWidth - (s2_right.offsetWidth + s2_left.offsetWidth);

        root.style.setProperty('--s2-left', `${available_space / 2}px`);
        root.style.setProperty('--s2-right', `${available_space / 2}px`);
    } else {
        root.style.setProperty('--s2-left', 'auto');
        root.style.setProperty('--s2-right', 'auto');
    }
}

updateHeroHeight();


// *********************************************

const images = document.querySelectorAll('.hero .mb-carousel-item');

function updateImgHeightVariable() {
    images.forEach(image => {
        const heroImg = image.querySelector('img').offsetHeight;
        const halfCircle = image.querySelector('.circle2').offsetHeight / 2;
        root.style.setProperty('--img-height', (heroImg - halfCircle) + 'px');
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
        root.style.setProperty('--div-height', 200 + 'px');
        viewportHeight = 800;
    } else {
        root.style.setProperty('--div-height', 25 + 'vh');
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
    if (window.innerWidth > 750 && mobileNav.classList.contains('shown')) {
        mobileNav.classList.remove('shown');
        mobileNavBtn.classList.remove('navbar-shown');
        document.body.classList.remove('hide-overflow');
    }
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