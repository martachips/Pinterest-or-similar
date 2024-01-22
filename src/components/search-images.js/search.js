const inputSearch = document.querySelector('#input-text');
const divAppResults = document.querySelector('.div-app');
const formSearch = document.querySelector('#search-form');
let keyword = '';
let page = 1;
let perPage = 20;
const apiKey = import.meta.env.VITE_ACCESS_KEY;

export async function searchImages() {
  keyword = inputSearch.value;

  if (!keyword) {
    keyword = 'cats';
  }

  const apiUrlWithApiKey = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=${perPage}&page=${page}&client_id=${apiKey}`;

  try {
    const response = await fetch(apiUrlWithApiKey);
    if (!response.ok) {
      throw new Error('Error en la solicitu: ${response.status}');
    }
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
  } catch (error) {
    console.error('Error:', error);
  }
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault(); //previene que el formulario recargue la página
  page = 1;
  searchImages();
});
