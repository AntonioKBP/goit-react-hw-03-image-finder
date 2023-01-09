import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
// import { Audio } from 'react-loader-spinner';
import { Component } from 'react';

import axios from 'axios';

const KEY = '31349139-c34332f5cc1455d1f889740ec';

export class App extends Component {
  state = {
    image: [],
    isLoading: false,
    page: 1,
    search: '',
  };

  componentDidMount() {
    console.log('mount');
    this.fetchData({ page: 1 });
  }

  componentDidUpdate(_, prevState) {
    console.log('update');
    const { search } = this.state;
    if (search !== prevState.search) {
      this.fetchData({ search });
    }
  }

  handleSearch = search => {
    this.setState({ search });
  };

  fetchData = async ({ page = 1, search = '' }) => {
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        image: [...prevState.image, ...data.hits],
        imageHits: data,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { image } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSearch} />
        {<ImageGallery>{<ImageGalleryItem data={image} />}</ImageGallery>}
        <Button />
        <Modal />
      </>
    );
  }
}
