const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if(1 < window.scrollY) {
    nav.classList.add('nav-blur');
  } else 
    nav.classList.remove('nav-blur');
})