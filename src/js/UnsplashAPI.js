import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';
  getPopularPhotos(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: 'random',
        page,
        per_page: 24,
        client_id: this.#API_KEY,
      },
    });
  }
  getPhotosByQuery(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: this.#query,
        page,
        per_page: 24,
        client_id: this.#API_KEY,
      },
    });
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
