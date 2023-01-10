import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Component } from 'react';

import { requestHTTP } from './services/services';

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

  handleSearch = async search => {
    this.setState({ isLoading: true });
    this.setState({ search, page: 1, image: [] });
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    if (prevSearch !== nextSearch) {
      this.loadDataImg();
    }
  }
  loadDataImg = async () => {
    const { search, page } = this.state;
    try {
      const data = await requestHTTP(search, page);
      data.hits.map(items => {
        return this.setState(({ image }) => ({ image: [...image, items] }));
      });
      this.setState(({ page }) => ({ page: page + 1 }));
    } catch (error) {
      console.log('Error', error);
    } finally {
      this.setState({ isLoading: false });
    }
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

        {
          <ImageGallery>
            {<ImageGalleryItem data={image} onHandleModal={this.handleModal} />}
          </ImageGallery>
        }
        {isLoading && <Loader />}
        {image.length === 0 || imageHits.totalHits === image.length || (
          <Button onClick={this.loadDataImg} />
        )}

        {showModal && <Modal onClose={this.toggleModal} url={url} alt={alt} />}
      </>
    );
  }
}
