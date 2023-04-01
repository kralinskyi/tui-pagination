import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination'; //Import TUI
import 'tui-pagination/dist/tui-pagination.css'; //Import TUI CSS
import createGalleryCards from '../templates/gallery-card.hbs';
import onCheckboxClick from './isChangeTheme';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');

const unsplashApi = new UnsplashAPI();

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: 0,
  itemsPerPage: 24,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

async function onRenderPage(page) {
  try {
    const response = await unsplashApi.getPopularPhotos(page);
    // Перевірка, якщо нічого не повернулось приховуємо пагінацію
    if (response.data.results.length === 0) {
      return container.classList.add('is-hidden');
    }
    galleryEl.innerHTML = createGalleryCards(response.data.results);
    pagination.reset(response.data.total);
    // Якщо все добре, додаємо пагінацію
    container.classList.remove('is-hidden');
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

// пошук по Input
// Прописуємо повторно функцію для паганіції для інших запросів
const createPhotosByQueryPagination = async event => {
  try {
    const currentPage = event.page;

    // Робимо подальші запити
    const response = await unsplashApi.getPhotosByQuery(currentPage);

    // Після відповіді відмальовуємо розмітку
    galleryEl.innerHTML = createGalleryCards(response.data.results);
  } catch (err) {
    console.log(err);
  }
};

const onSearhFormSubmit = async event => {
  event.preventDefault();

  const searchQuery =
    event.currentTarget.elements['user-search-query'].value.trim();
  unsplashApi.query = searchQuery;
  // if (!searchQuery) {
  //   alert('Input is empty');
  // }
  // Відписуємось від попередніх пагінацій
  pagination.off('afterMove', createPopularPagination);
  pagination.off('afterMove', createPhotosByQueryPagination);

  try {
    const response = await unsplashApi.getPhotosByQuery(page);
    // Перевірка на невірний ввод!
    if (response.data.results.length === 0) {
      // Чистимо розмітку
      galleryEl.innerHTML = '';
      // Прибираємо пагінацію
      container.classList.add('is-hidden');
      // Чистимо інпут
      searchFormEl.reset();
      // Виводимо повідомлення
      return alert(
        `Your search: "${searchQuery}"`,
        'Nothing was found for your search!'
      );
    }

    // Робимо ще одну перевірку, якщо знайдено картинок, меньше ніж відмальвуємо на сторінці
    if (response.data.results.length < options.itemsPerPage) {
      // Прячемо пагінацію
      container.classList.add('is-hidden');

      // Відмальвуємо розмітку
      galleryEl.innerHTML = createGalleryCards(response.data.results);
      return;
    }

    // Оновлюємо пагінацію, щоб при новому запросі, відображалась з 1 сторінки
    pagination.reset(response.data.total);
    galleryEl.innerHTML = createGalleryCards(response.data.results);
    // Робимо підписку на нову пагінацію, для подальших запросів
    pagination.on('afterMove', createPhotosByQueryPagination);
    // Якщо все добре, додаємо пагінацію
    container.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearhFormSubmit);
// Переключение фона
const checkBoxEl = document.querySelector('#theme-switch-toggle');
checkBoxEl.addEventListener('change', onCheckboxClick);
