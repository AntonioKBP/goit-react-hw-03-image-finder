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
    image: [],
    imageHits: [],
    isLoading: false,
    showModal: false,
    page: 1,
    search: '',
    url: '',
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
    }

    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.setState(
        (prevState = {
          image: [...prevState.image, ...data.hits],
          imageHits: data,
        })
      );

      if (data.total === 0) {
        this.setState({ image: [] });
      }
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearch = search => {
    this.setState({ search, page: 1, image: [] });
  };

  loadMore = async () => {
    this.setState(pS => ({
      page: pS.page + 1,
    }));
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
          <Button onClick={this.loadMore} />
        )}

        {showModal && <Modal onClose={this.toggleModal} url={url} alt={alt} />}
      </>
    );
  }
}
