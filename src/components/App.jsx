import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
// import { Audio } from 'react-loader-spinner';
import { Component } from 'react';

import axios from 'axios';

export class App extends Component {
  state = {
    data: [],
    isLoading: false,
  };

  // fetchData = async (page = 1) => {
  //   const data = await axios.get(
  //     'https://pixabay.com/api/?q=cat&page=1&key=31349139-c34332f5cc1455d1f889740ec&image_type=photo&orientation=horizontal&per_page=12'
  //   );
  //   console.log(data);
  // };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        'https://pixabay.com/api/?q=cat&page=1&key=31349139-c34332f5cc1455d1f889740ec&image_type=photo&orientation=horizontal&per_page=12'
      );
      this.setState({ data });
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <>
        <SearchBar />
        {<ImageGallery>{<ImageGalleryItem />}</ImageGallery>}
        <Button />
        <Modal />
      </>
    );
  }
}

// 31349139-c34332f5cc1455d1f889740ec
