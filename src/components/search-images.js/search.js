import html2canvas from 'html2canvas';
import './search.css';

const main = document.querySelector('.main');
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
      throw new Error(`Error en la solicitu: ${response.status}`);
    }
    const data = await response.json();

    //ahora se controla si es la primera búsqueda, en cuyo caso, se limpia el contenedor:
    if (page === 1) {
      divAppResults.innerHTML = '';
    }

    const results = data.results;

    if (results.length === 0) {
      const imgNotFound = document.createElement('img');
      divAppResults.appendChild(imgNotFound);
      imgNotFound.src =
        'https://i.pinimg.com/564x/12/bb/80/12bb80dc4852cab654f4ea52b42ef3dc.jpg';
      imgNotFound.classList.add('img-not-found');
      divAppResults.classList.remove('div-app');
      divAppResults.classList.add('div-app-no-results');
    } else {
      divAppResults.classList.remove('div-app-no-results');
      divAppResults.classList.add('div-app');

      results.forEach((result) => {
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = result.urls.small;
        img.dataset.large = result.urls.full;

        img.addEventListener('click', () => {
          showImage(result.urls.full);
        });

        divAppResults.appendChild(img);
      });
      page++;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

formSearch.addEventListener('submit', (e) => {
  e.preventDefault(); //previene que el formulario recargue la página
  page = 1;
  if (main.querySelector('.div-app').classList === 'hidden') {
    main.querySelector('.div-app').classList.remove('hidden');
  }
  searchImages();
});

const showImage = (url) => {
  const photoFrame = createFrame(url);
  const btnShowMore = document.querySelector('.btn-show-more');
  main.querySelector('.div-app').classList.add('hidden');
  btnShowMore.classList.add('hidden');
  main.append(photoFrame);
};

const createFrame = (url) => {
  const btnShowMore = document.querySelector('.btn-show-more');
  const photoFrame = document.createElement('article');
  photoFrame.classList.add('photo-frame');

  const backButton = document.createElement('button');
  backButton.classList.add('back-btn');
  backButton.textContent = 'Volver';

  backButton.addEventListener('click', () => {
    photoFrame.remove();
    main.querySelector('.div-app').classList.remove('hidden');
    btnShowMore.classList.remove('hidden');
  });

  const frame = document.createElement('div');
  frame.classList.add('frame', 'frame-left');

  const selectedImage = document.createElement('img');
  selectedImage.classList.add('selected-image');
  selectedImage.src = url;
  selectedImage.crossOrigin = 'Anonymous';

  const imageText = document.createElement('textarea');
  imageText.classList.add('image-text');
  imageText.id = 'image-text';
  imageText.maxLength = 200;
  imageText.placeholder = 'Escribe un texto...máximo 200 caracteres';

  const frameControls = document.createElement('div');
  frameControls.classList.add('frame-controls');

  const labelRight = document.createElement('label');
  labelRight.classList.add('label-right');

  const labelLeft = document.createElement('label');
  labelLeft.classList.add('label-left');

  const inputRight = document.createElement('input');
  inputRight.type = 'radio';
  inputRight.id = 'right-input';
  inputRight.name = 'alignment';
  inputRight.value = 'right';

  const inputLeft = document.createElement('input');
  inputLeft.type = 'radio';
  inputLeft.id = 'left-input';
  inputLeft.name = 'alignment';
  inputLeft.value = 'left';
  inputLeft.checked = true;

  inputRight.addEventListener('change', () => {
    frame.classList.remove('frame-left');
    frame.classList.add('frame-right');
  });
  inputLeft.addEventListener('change', () => {
    frame.classList.remove('frame-right');
    frame.classList.add('frame-left');
  });

  const downloadButton = document.createElement('button');
  downloadButton.classList.add('download-btn');
  downloadButton.textContent = 'Descargar';

  labelRight.append(inputRight, ' Derecha');
  labelLeft.append(inputLeft, ' Izquierda');
  frameControls.append(labelLeft, labelRight);
  frame.append(selectedImage, imageText);
  photoFrame.append(backButton, frame, frameControls, downloadButton);

  downloadButton.addEventListener('click', () => {
    downloadImg(frame);
  });

  return photoFrame;
};

const downloadImg = (element) => {
  html2canvas(element, { useCORS: true })
    .then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'image_with_text.png';
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('Error capturing the frame: ', error);
    });
};
