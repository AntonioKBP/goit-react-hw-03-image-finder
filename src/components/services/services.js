import axios from 'axios';
import PropTypes from 'prop-types';

export const requestHTTP = async (inputValue, page) => {
  const URL =
    'https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&';
  const OPTION = `q=${inputValue}&image_type=photo&orientation=horizontal&`;
  const PAGES = `page=${page}&per_page=12`;
  try {
    const response = await axios.get(`${URL}${OPTION}${PAGES}`);
    return response.data;
  } catch (error) {
    return console.log('Somthing went wrong');
  }
};

requestHTTP.propTypes = {
  inputValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
