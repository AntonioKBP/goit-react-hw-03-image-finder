import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
// import {Loader} from './Loader'
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  return (
    <>
      <SearchBar />
      <ImageGallery />
      <ImageGalleryItem />
      <Button />
      <Modal />
    </>
  );
};
