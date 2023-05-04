import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

const API_KEY = '35200671-7af045ac24191cf7c9239d52b';

export async function fetchImagesWithQuery(query, page = 1) {
  const response = await axios.get(
    `/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
}
// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '35200671-7af045ac24191cf7c9239d52b';

// export const getImagesApi = (currentValue, pageNumber) => {
//   const searchParams = new URLSearchParams({
//     page: pageNumber,
//     q: currentValue,
//     per_page: 12,
//     image_type: 'photo',
//     orientation: 'horisontal',
//     safesearch: true,
//     key: API_KEY,
//   });
//   return axios.get(`${BASE_URL}?${searchParams}`);
// };
