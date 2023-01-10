import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Component } from 'react';

import axios from 'axios';

const KEY = '31349139-c34332f5cc1455d1f889740ec';

export class App extends Component {
  state = {
    data: null,
    image: [],
    isLoading: false,
    showModal: false,
    page: 1,
    search: '',
    url: '',
    alt: '',
  };

  // componentDidMount() {
  //   console.log('mount');
  //   this.fetchData({ page: 1 });
  // }

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
    }
    const { search } = this.state;
    if (search !== prevState.search) {
      this.fetchData({ search });
    }

    if (this.data?.total === 0) {
      this.setState({ image: [] });
    }
  }

  handleSearch = search => {
    this.setState({ search, page: 1, image: [] });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModal = (url, alt) => {
    this.toggleModal();
    this.setState({ url, alt });
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
    const { image, imageHits, isLoading, showModal, url, alt } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        {
          <ImageGallery>
            {<ImageGalleryItem data={image} onHandleModal={this.handleModal} />}
          </ImageGallery>
        }
        {image.length === 0 || imageHits.totalHits === image.length || (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && <Modal onClose={this.toggleModal} url={url} alt={alt} />}
      </>
    );
  }
}
