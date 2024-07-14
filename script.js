let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ' ]').classList.add('active')
            })
        }
    })
}


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*
let lang = 'en'; // Defina o idioma inicial

function switchLanguage() {
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    
    elementsToTranslate.forEach(element => {
        if (lang === 'en') {
            if (element.dataset.langEn) {
                element.innerText = element.dataset.langEn;
            }
        } else if (lang === 'pt') {
            if (element.dataset.langPt) {
                element.innerText = element.dataset.langPt;
            }
        }
    });

    // Alternar entre inglês e português
    if (lang === 'en') {
        lang = 'pt';
        document.querySelector('.language-selector').innerText = 'Português';
    } else {
        lang = 'en';
        document.querySelector('.language-selector').innerText = 'English';
    }
}
*/