import './style.css';
import { searchImages } from './src/components/search-images.js/search';

// const formSearch = document.querySelector('#search-form');
const buttonShowMore = document.querySelector('.btn-show-more');

// formSearch.addEventListener('submit', (e) => {
//   e.preventDefault(); //previene que el formulario recargue la página
//   page = 1;
//   searchImages();
// });

document.addEventListener('DOMContentLoaded', () => {
  searchImages(); //se ejecuta cuando todo el HTML del documento ha sido completamente cargado
});

buttonShowMore.addEventListener('click', () => {
  searchImages();
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (this.window.scrollY > 0) {
      header.style.backgroundColor = '#f2eeee';
    } else {
      header.style.backgroundColor = 'transparent';
    }
  });
});
