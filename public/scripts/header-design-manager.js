/* Support */
const navigateTo = (path) => { window.location.href = path; }

const header = document.querySelector("header");
const view = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

const addActiveClass = () => {
    switch(view){
        case '':
            document.getElementById('nb-home').classList.add('nav-active');
            break;
        case 'workexperience':
            document.getElementById('nb-work-exp').classList.add('nav-active');
            break;
        case 'education':
            document.getElementById('nb-edu').classList.add('nav-active');
            break;
        default:
            document.getElementById('nb-adm').classList.remove('hidden');
            document.getElementById('nb-home').classList.add('hidden');
            document.getElementById('nb-work-exp').classList.add('hidden');
            document.getElementById('nb-edu').classList.add('hidden');
    }
}

/* Navigation bar manager */
addActiveClass();

window.addEventListener("scroll", (event) => {
    let scrollStage = document.documentElement['scrollTop'];

    if (scrollStage >= 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.getElementById('nb-home').onclick = () => { navigateTo('/'); }

document.getElementById('nb-work-exp').onclick = () => { navigateTo('/workexperience'); }

document.getElementById('nb-edu').onclick = () => { navigateTo('/education'); }

document.getElementById('nb-e-logo').onclick = () => {
    if (view === 'admin') navigateTo('/');
    else navigateTo('/admin');    
}


