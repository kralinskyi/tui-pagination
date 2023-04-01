import axios from 'axios'

export class UnsplashAPI { 
    
    #BASE_URL = 'https://api.unsplash.com';
    #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc'; 

    getPopularPhotos(page) { 
        return axios.get(`${this.#BASE_URL}/search/photos`, {
            params: {
                query: 'random', 
                page, 
                per_page: 12,
                client_id: this.#API_KEY
            }
        })
    }
}

