import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formElem = document.querySelector('.search-form');
const list = document.querySelector('.pictures-list');
const loadBtn = document.querySelector('.js-load-btn');
const loader = document.querySelector('.js-loader');




function fetchImages(query) {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams({
      key: '42110209-7b075b8eaa13f3df464bddae0',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `https://pixabay.com/api/?${urlParams}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          reject(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          resolve(data.hits);
        }
      })
      .catch(error => reject(error));
  });
}

formElem.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const query = e.target.elements.query.value;
  list.innerHTML = '';
  showLoader();

  fetchImages(query)
    .then(photos => {
      renderPictures(photos);
      hideLoader();
    })
    .catch(error => {
      showMessage(error);
      hideLoader();
    })
    .finally(() => form.reset());
};

const lightbox = new SimpleLightbox('.pictures-list a', {
  captionDelay: 250,
  captionsData: 'alt',
});


function renderPictures(photos) {
  const markup = picturesTemplate(photos);
  list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function pictureTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return ` <li class="picture-card">
<a class="gallary-card-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" />
  <ul class="image-info">
    <li class="image-item-info">
      <p>Likes</p>
      <p>${likes}</p>
    </li>
    <li class="image-item-info">
      <p>Views</p>
      <p>${views}</p>
    </li>
    <li class="image-item-info">
      <p>Comments</p>
      <p>${comments}</p>
    </li>
    <li class="image-item-info">
      <p>Downloads</p>
      <p>${downloads}</p>
    </li>
  </ul>
</a>
</li>`;
}
function picturesTemplate(photos) {
  return photos.map(pictureTemplate).join('');
}


function showMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}