import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data, onHandleModal }) => {
  console.log(data);
  return (
    <>
      {data.map(item => (
        <ListItem
          key={item.id}
          onClick={() => onHandleModal(item.largeImageURL, item.user)}
        >
          <Image src={item.webformatURL} alt={item.user} />
        </ListItem>
      ))}
    </>
  );
};

// // {
//   // /* <ListItem>
//   //     <Image src="" alt="" />
//   //   </ListItem> */
// }
