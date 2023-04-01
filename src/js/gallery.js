import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination'; //Import TUI
import 'tui-pagination/dist/tui-pagination.css'; //Import TUI CSS
import createGalleryCards from '../templates/gallery-card.hbs';

const galleryEl = document.querySelector('.js-gallery');

const unsplashApi = new UnsplashAPI();
console.log(unsplashApi);

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

console.log(page);

async function onRenderPage(page) {
  try {
    const response = await unsplashApi.getPopularPhotos(page);
    console.log(response.data);

    galleryEl.innerHTML = createGalleryCards(response.data.results);
    pagination.reset(response.data.total);

    console.log(response.data.total);
  } catch (err) {
    console.log(err);
  }
}
const createPopularPagination = async e => {
  try {
    const currentPage = e.page;
    const response = await unsplashApi.getPopularPhotos(currentPage);
    galleryEl.innerHTML = createGalleryCards(response.data.results);
  } catch (err) {
    console.log(err);
  }
};

pagination.on('afterMove', createPopularPagination);

onRenderPage(page);
