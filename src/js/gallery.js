import { UnsplashAPI } from "./UnsplashAPI";
import Pagination from 'tui-pagination'; //Import TUI
import 'tui-pagination/dist/tui-pagination.css'; //Import TUI CSS

const unsplashApi = new UnsplashAPI();
console.log(unsplashApi); 

const container = document.getElementById('tui-pagination-container');

const options = {
    totalItems: 10,
    itemsPerPage: 10,
    visiblePages: 10,
    page: 1
}

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

console.log(page);
