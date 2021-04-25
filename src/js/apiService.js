const BASE_URL = 'https://pixabay.com/api/';
const KEY = '21310790-6d6680180298903e41d8cd1c1';
let page = 1;

export default class ApiService {
  constructor() {}

  async fetchByQuery(query) {
    try {
      const response = await fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${KEY}`,
      );
      const data = await response.json();
      page++;
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }
  resetPage() {
    page = 1;
  }
}
