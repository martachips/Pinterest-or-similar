import './style.css';

const formSearch = document.querySelector('#search-form');
const inputSearch = document.querySelector('#input-text');
const divAppResults = document.querySelector('.div-app');
const buttonShowMore = document.querySelector('.btn-show-more');
let keyword = '';
let page = 1;
let perPage = 20;
const apiKey = 'yzaUgjeSfPiVfdFIWwJuslWJNPB2C_NeswxhGbV9VsI';

async function searchImages() {
  keyword = inputSearch.value;

  if (!keyword) {
    keyword = 'cats';
  }

  const apiUrlWithApiKey = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${perPage}&page=${page}&client_id=${apiKey}`;

  const response = await fetch(apiUrlWithApiKey);
  const data = await response.json();
  //ahora se controla si es la primera búsqueda, en cuyo caso, se limpia el contenedor:
  if (page === 1) {
    divAppResults.innerHTML = '';
  }

  const results = data.results;
  results.map((result) => {
    const aImg = document.createElement('a');
    const img = document.createElement('img');
    aImg.classList.add('insp-img');
    img.classList.add('image');
    img.src = result.urls.small;
    aImg.href = result.links.html;
    aImg.target = '_blank';

    aImg.appendChild(img);
    divAppResults.appendChild(aImg);
  });
  page++;
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

document.addEventListener('DOMContentLoaded', () => {
  searchImages();
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
