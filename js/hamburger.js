        // document.querySelector('.hamburger').addEventListener('click',() => {
        //     document.querySelector('.nav-menu').classList.toggle('active')
        // });


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu')


hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

document.addEventListener('click', function(e) {
    if(!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    });
});