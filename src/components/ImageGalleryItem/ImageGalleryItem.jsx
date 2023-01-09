import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data, onHandleModal }) => {
  console.log(data);
  return (
    <>
      {data.map((item, index) => (
        <ListItem key={item.index}>
          <Image
            src={item.webformatURL}
            alt={item.user}
            onClick={() => onHandleModal()}
          />
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
