import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ModalInner } from './Modal/ModalInner';
import { Loader } from './Loader/Loader';
import { Toast } from './Toast/ToastContainer';
import { Container } from './App.styled';

// import { requestHTTP } from './services/services';

const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '31349139-c34332f5cc1455d1f889740ec';

export class App extends Component {
  state = {
    image: [],
    search: '',
    imageHits: [],
    isLoading: false,
    showModal: false,
    page: 1,
    url: '',
    alt: '',
  };

  handleSearch = search => {
    this.setState({ search, page: 1, image: [] });
  };

  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const { data } = await axios.get(
          `${BASE_URL}q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        this.setState(
          (prevState = {
            image: [...prevState.image, ...data.hits],
            imageHits: data,
          })
        );

        if (this.state.image.length === 0) {
          toast.success(`We found ${data.total} images`);
        }

        if (data.total === 0) {
          this.setState({ image: [] });
          toast.info('No images has been found');
        }
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

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
      <Container>
        <SearchBar onSubmit={this.handleSearch} />

        {
          <ImageGallery>
            {<ImageGalleryItem data={image} onHandleModal={this.handleModal} />}
          </ImageGallery>
        }
        {isLoading && <Loader />}
        <Toast />
        {image.length === 0 || imageHits.totalHits === image.length || (
          <Button onClick={this.loadMore} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalInner url={url} alt={alt} />
          </Modal>
        )}
      </Container>
    );
  }
}
