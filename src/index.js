import './styles.css';
import ApiService from './js/apiService';
import { debounce } from 'lodash';
import imgTemplate from './templates/renderImg.hbs';

const refs = {
  input: document.querySelector('[name="query"]'),
  ulGalleryRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.loadMoreBtn'),
  doc: document,
};

const apiService = new ApiService();

refs.input.addEventListener('input', debounce(onInputHandle, 500));

async function onInputHandle() {
  refs.ulGalleryRef.innerHTML = '';
  apiService.resetPage();
  if (refs.input.value !== '') {
    refs.loadMoreBtn.classList.remove('hiddenBtn');
  } else {
    refs.ulGalleryRef.innerHTML = '';
    refs.loadMoreBtn.classList.add('hiddenBtn');
    return (refs.ulGalleryRef.innerHTML = 'Input something!');
  }
  const response = await apiService.fetchByQuery(refs.input.value);
  const images = response.hits;
  renderImages(images);
}

function renderImages(images) {
  const imgCardsMarkup = images.map(image => imgTemplate(image)).join('');
  refs.ulGalleryRef.insertAdjacentHTML('beforeend', imgCardsMarkup);
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  const response = await apiService.fetchByQuery(refs.input.value);
  const images = response.hits;
  renderImages(images);
}
