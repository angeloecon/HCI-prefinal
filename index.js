const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if(1 < window.scrollY) {
    nav.classList.add('nav-blur');
  } else 
    nav.classList.remove('nav-blur');
})


function animateElements(element) {
  let image;
  if (element.classList.contains('sub-details')) {
    image = element.parentElement.parentElement.querySelector('.image');
  } else if (element.classList.contains('image')) {
    image = element;
    element = element.parentElement.querySelector('.sub-details');
  }
  const button = element.querySelector('.buy-button');
  const subElements = [
    element.querySelector('h1'),
    ...element.querySelectorAll('p'),
    ...element.querySelectorAll('.img-container img')
  ].filter(el => el);

  const images = [...element.querySelectorAll('.img-container img')];
  const reversedImages = images.reverse();
  const nonImageElements = subElements.filter(el => el.tagName !== 'IMG');
  const finalElements = [...nonImageElements, ...reversedImages];

  if (image) {
    image.style.transition = 'transform 1s ease';
    image.style.transform = 'translateX(0)';

    image.addEventListener('transitionend', () => {
      let delay = 0;
      finalElements.forEach((el) => {
        setTimeout(() => {
          el.style.opacity = '1';
        }, delay);
        delay += 1000;
      });

      let lastSubDetailDelay = delay;
      setTimeout(() => {
        if (button) {
          button.style.transition = 'transform 1s ease';
          button.style.transform = 'translateX(0)';
        }
      }, lastSubDetailDelay);
    }, { once: true });
  }
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateElements(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

function setupObservers() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  const containers = document.querySelectorAll('.main-container');
  containers.forEach(element => {
    observer.observe(element.querySelector('.sub-details') || element.querySelector('.image'));
  });
}

setupObservers();



// if(index != 0){
//   if (elements.children && elements.children.length > 0) {
//     const subarr = Array.from(elements.children);
//     console.log(subarr);
//   } else {
//     console.log("Element has no children.");
//     //Or console.log(elements); to see what element is being passed.
//   }
// } else {
  

//   setTimeout(() => {
//     elements.style.transform = 'translateX(0)'; // Slide back to original position
// }, 500);
// }